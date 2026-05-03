import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    //?Read the token from the req cookies

    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }
    //?validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    //?Find the user.
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
