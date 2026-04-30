import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      //!Now user will definitely have to give a firstName, otherwise mongoose will not allow the insertion into the database.Mongoose will not allow the insertion of documents into the collection.

      //&Suppose if you want that atleast your firstName should be of the minimum length of 4 characters,my name should be of atleast 4 characters.Now if I try to enter the user with 3 characters then mongoose will again throw the error.This is how you can add much more validations
      minLength: 4,
      //~Now suppose the maximum length of the name should be 50 charaacters,there should not be a name more than 100 characters.
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      min: 18,
      type: Number,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    emailId: {
      // ← was completely missing!
      type: String,

      lowercase: true,
      required: true,

      unique: true,

      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    photoUrl: {
      type: String,

      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo url: " + value);
        }
      },
    },
    about: {
      type: String,

      default: "This is a default description about the user",
    },
    skills: {
      type: [String],
    },
  },

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
