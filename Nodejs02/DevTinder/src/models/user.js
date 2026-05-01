import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      minLength: 4,

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
