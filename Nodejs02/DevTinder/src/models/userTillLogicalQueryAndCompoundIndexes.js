import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      index: true,
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
      //&Adding a enum
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
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

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPassWordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isPassWordValid;
};

export const User = mongoose.model("User", userSchema);
