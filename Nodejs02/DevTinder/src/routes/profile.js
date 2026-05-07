import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
  // res.send("Reading Cookie");
});

//?Let us create the one more api that is "/profile/edit" api.
//?ThoughtProcess of writing "/profile/edit" api === I can either modify my age over here.I can send inside the body inside the POSTMAN.Then I can also change the gender,Then i can also add the "photoUrl".Then over here I can also add skills.I can also change or add the about section as well.

//?First of all I will do the data sanitization and data validation

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //~this below function will be created inside the utils folder,inside the validation.js file.Let us now meet in the validation.js file.
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    //?Now in the userAuth,we already check for the user authentication,we basically already find the user from the database,and we attach that to the req.user.

    //?The user here is basically the loggedIn user.
    const loggedInUser = req.user;
    //console.log(loggedInUser);
    //?Now I want to edit the details of this loggedIn user.
    // loggedInUser.firstName = req.body.firstName;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName}, your profile is updated successfully`);
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

export default profileRouter;
