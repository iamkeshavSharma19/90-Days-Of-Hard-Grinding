//^Creating a express router.
//^first of all import express.
import express from "express";

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



export default authRouter;
