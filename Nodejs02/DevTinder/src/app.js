import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();

app.use(express.json());

//&These POST API'S AND Patch api's are the ones which are inserting some data into the database.How will you insert data into the database?Either some user registers onto your application,or if the user is trying to update his profile.These are basically the 2 api's where you basically need to have strict checks.Even before putting some checks inside these api's we should basically add some checks inside the database itself, inside the schema itself.

//~Go to the user schema

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
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

app.patch("/user", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;

  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      //&this will now run the validator function whenever the update method will be called.I have to explicitly allow the runValidators.if i know pass gender as "hello",it will basically say === "Something Went Wrong".Because it failed inside the try block and it went to the catch block.
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

    // console.log(res);

    app.listen(7777, () => {
      console.log("App is listening on Port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
