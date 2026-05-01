import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassWordValid = await bcrypt.compare(password, user.password);

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
