import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();

app.use(express.json());

//&These POST API'S AND Patch api's are the ones which are inserting some data into the database.How will you insert data into the database?Either some user registers onto your application,or if the user is trying to update his profile.These are basically the 2 api's where you basically need to have strict checks.Even before putting some checks inside these api's we should basically add some checks inside the database itself, inside the schema itself.

//~Let us now also talk about the API Level validations.First of all let me talk about what is the problem with our api's.Somebody is signing onto our platform, when the user is signing up, I donot need all the information about the user.I donot need the age of the user,I also donot even need the skills, I donot also need the photo id of the user.I donot need the lot of other things.Basically I just want to take 4 fields.Think about a UI where you have a Sign up form which asks for your firstName, your lastName, your emailId, your password and it just signs you up for the application.

//?Now also, suppose if I try to update the emailId of any user document, will I be able to do it ??Yes it will update it.But what if I donot want any of my users to update the emailId once he has registered.Because it will be a very big problem for us.emailId is a very sensitive thing.The user can then completely change his identity.Suppose if the user is signing up for the first time,they have given me some emailId,Now emailId change is not allowed.I donot want emailId to be changed when I am updating my user.For this I need to put the api level validation.

//!Even if i pass some random data "xyz": "sdsdsdsds", it will again say === user updated successfully.But inside the document no "xyz" field will be created because we have not defined that in our schema.I want if the user is updating his profile,he can only update the certain fields of the profile.Go to the PATCH API.

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

app.patch("/user/:userId", async (req, res) => {
  //&API Level validations === I want in my req.body,if my emailId is coming then ignore it.I donot want emailId to be updated.

  //todo === user can update and also add 1000 skills so can you add a validation for this ?This is your homework.You should basically add validaitons to almost everything.Never trust the user data.attackers can attack your api's and they can also send the malacious data and your db can break.what if the user is sending 1 million skills into our database ??
  console.log(req.body);
  //?Instead of getting my userId from the body,i can get my userId from the url also.in future we will use cookies and headers to fetch this userId.Now in this case my userId will basically come from the req.params.userId
  const userId = req.params?.userId;

  const data = req.body;

  const ALLOWED_UPDATES = [
    //& If you want to change your photoUrl you can change it, similarly about, gender, age

    //& I want my user to change these things only nothing else.

    //& user should not be able to change his firstName, lastName and emailId

    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
  ];

  //& Now I will basically validate my req.body data

  //~Let us create a function isUpdateAllowed

  /* 
  {
    "firstName": "Randy",
    "lastName": "Orton",
    "emailId": "Randy123@gmail.com",
    "password": "Viper@2468",
    "gender": "male",
    "about": "I hear voices in my head they come to me and say They talk to me!",
    "skills": ["RKO", "wrestling", "bodybuilding"]
}
  */

  try {
    //todo === Here I am just looping through all of these keys of the req.body object{pasted in the above comment} and I will make sure that every key is present in the allowed updates.So it will check is userId allowed over here ?emailId is allowed,no this email id is not allowed,gender alllowed.skills are also allowed.If any of this is not allowed then my isUpdateAllowed will be false.It will check for every key should be included in the ALLOWED_UPDATES.If any of the key is not present in it then I can just throw my error.You should always sanitize everything.
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
