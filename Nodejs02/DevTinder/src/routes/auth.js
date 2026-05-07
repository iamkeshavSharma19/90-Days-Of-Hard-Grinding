//^Creating a express router.
//^first of all import express.
import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
const authRouter = express.Router();

//&SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    if (user?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    await user.save();
    res.send("User Added successfully");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

//&Login api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // console.log(emailId);
    // console.log(password);

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassWordValid = await user.validatePassword(password);

    // const isPassWordValid = await bcrypt.compare(password, user.password);

    if (isPassWordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//?Logout api
//?ThoughtProcess for writing the "/logout" api === Whenever we were logging in,we were expecting user to pass in emailId and password.When we get the emailId,I was checking whether the user is there on the database or not ??We said if the user is not there that means Invalid credentials,if the emailId is not present in our database,then that means invalid credentials.Suppose if the email exists in our database,but the password is incorrect,then we also throw a error "invalid credentials".If the login is Successful,we generate a jwt token and we basically create a cookie with the token,and we will send that cookie and we will also send the success response that the user logged in successfully.Whenever you are logging in, a new cookie is being created by the server and given it to the client[POSTMAN] and the cookie is stored inside my postman.

//?Now when you make any other api call let say to the "/profile",the same cookie is passed and the user is authorised and the data is retrieved.

//?logout api === As soon as the user is trying to logout,the user should be logged in then only we would want that user to logout.But what will happen if the user is not logged in ??and he tries to call the logout api,will it be a harm to our application ??Not at all.You can let the user log out if he is loggen in then also they can call logout and if they are already logged out then also they can call logout.I donot see any problem with it.There is no need to put any authentication in the "/logout" api.

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

export default authRouter;
