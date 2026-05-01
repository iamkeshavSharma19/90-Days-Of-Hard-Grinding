import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

//&our passwords should not be stored in the form of plain text into our database.Because these passwords are readable.I can read it.A password should be stored in a hash format.Password should be stored in an encrypted format.Nobody should be able to see the password in our database.

//~But before doing that we will first of all improve our signUp api.Basically this sign up api is for registering a new user.Suppose a new user is coming onto our website,this is the entry point of any user to our application.Never trust req.body.An attacker can send any malacious data into this req.body and that will be stored into the database.Our sign up api should be very very safe.

app.post("/signup", async (req, res) => {
  //^Step 1 === even before we create the new instance of the user model first thing should be as soon as someone hit the sign up api,first thing that should happen is the validation of the data.First thing is validating the data.if the data is not correct throw an error send a error response and do'nt let the user register onto your platform.The first thing should be the validation of the data.

  //?Sometimes we create some utility or helper functions where we will basically validate our data.This is the best Industry Practice.You should not do everything inside the sign up api you should create helper functions.in the src let us create one new folder utils,you can also call these functions as the utility functions.Let me create a file validation.js.In this file I will now do all kind of validations on my data.Let us go to the file validation.js.In will basically send this req object as the parameter to the validator function.All these validations do it inside a try catch block because suppose if any of the validations is failing and I am throwing a new error,whenever you will throw this new error and if you are doing it insde a try-catch then the catch block will catch that error and that error will be sent back to the api
  // validateSignUpData(req)
  try {
    validateSignUpData(req);
    //*Step2 === After that then you should encrypt the password

    //*After that then you should store user into the database.

    //*for encrypting the password I will use a npm package known as Bcrypt.This package basically gives you functions to hash your password and then also to validate your password. "npm i bcrypt".Now I will basically do the bcrypt.hash().

    //&when you do bcrypt.hash(),it will return you a promise back
    const { firstName, lastName, emailId, password } = req.body;
    //~to hash a password you basically need some encryption algorithms,when you do a bcrypt.hash(),it creates a hash using a salt and a plain password and then how many number of rounds that salt should be applied to create the password.The more the number of salt rounds the tougher the password to dcrypt.The good or a basic number is 10.

    //?When you encrypt a password.Now suppose your password is Brock@123.You want to encrypt this Brock@123.You need a salt.This salt is basically a random string.It could be something like this === "dfdfj9890@123q###" with some random characters.Now you take your plain password and your salt and then you do a multiple rounds of encryption.this is called as salt rounds.with the help of bcrypt.genSalt(),you can also generate a random salt also.10 rounds is basically a standard good number.

    //~After hashing the password we will now talk about How to implement the Login functionality.We will create a login api.Suppose the user has signed Up,now we want to validate this password also.
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);
    //!this below way is the very bad way of creating an instance to directly get the req.body and pass everything inside it.

    //!A good way is to explicitly mention all the fields
    // const user = new User(req.body);
    //!So what all fields I want
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log(user);

    if (user?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    await user.save();
    res.send("User Added successfully");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

//^Let us now create Login API
app.post("/login", async (req, res) => {
  try {
    //^this login id will basically take your emailId and password and it will validate that weather this emailId and password is correct or not.
    //^first of all I will extract my emailId and password from this req.body
    const { emailId, password } = req.body;
    //todo === Validate the emailId.Homework write that code by yourself

    //~Suppose a user is trying to login with some random email Id,this emailId is not there in my database,so first of all I will check that whether this user is present in my database or not ?? if in the database the user is present then I will check that whether the password is correct or not ???first of all I will check that the person who is trying to enter / login,is the email id is present in my database or not ???

    //^Suppose the emailId is valid then from the database I will get the user object.If my emailId is not valid then my user will be null or undefined.
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //*Now suppose If I got the user back and if the user with that emailId is present in my database,now I will compare the password which we have got from the request with the password which is stored in my db i.e user.password

    //?there is a function === bcrypt.compare and it returns you a boolean value.

    //*Now I will check if my password is valid or not ???
    const isPassWordValid = await bcrypt.compare(password, user.password);

    //&If my password is valid then I will just send the response back.

    if (isPassWordValid) {
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/findOneUser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail }).exec();
    // console.log(user);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  console.log(req.body);

  const userId = req.params?.userId;

  const data = req.body;

  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",

      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED :" + error.message);
  }
});

connectDB()
  .then((res) => {
    console.log("Database connection established...");

    app.listen(7777, () => {
      console.log("App is listening on Port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
