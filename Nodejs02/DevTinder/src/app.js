import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/auth.js";

//&Right now what we are doing is,we have just 1 app.js file,and we are writing all our api's over here.Suppose If I had 100 of api's,so shall we write 100 of api's in the same file??No

//~Instead we will create the expressRouter,and you handle routing in a proper way using express router.Go to the expressJS documentation,in the left side bar under express Go to the express.Router().Or directly in the search bar search for the express.Router().We will use this expressRouter to manage our api's effeciently,and we will group or api's into the different types of Routers.We will group our api's into the small-small categories,and we will create separate routers for all of them.And those routers will basically handle these routes.

//?How will I distinguish the api's is api's related to Auth like == "/signup", "/login", "/logout".So I can basically create a auth Router.And I will add all these 3 api's inside my authRouter.

//! In your src folder create a routes folder over here.All the routes will be managed by this route folder.Inside routes folder create auth.js file.auth.js file will manage the routes specific to the auth.

//!let us meet at the auth.js file.

//*inside routers folder let us also create a new file with the name as profile.js 

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use(cookieParser());

//?writing the signup logic in the auth.js file inside the routes folder.

//?writing the signup logic in the auth.js file inside the routes folder.


app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
  // res.send("Reading Cookie");
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.send(`${user.firstName} sent the connection request`);
});

connectDB()
  .then((res) => {
    console.log("Database connection established...");

    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
