import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//?This is the userSchema that we created but what is this userSchema ?This userSchema basically defines the user.I can attach some methods onto this schema that is basically applicable for all the users.What are these methods.These methods are helper methods that is very closely related to the user.
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

//~A good practice while coding is to create such methods which are attached to the userSchema.Every user can have their own jwt token and basically you can create an extra method over here.

//^Always make sure that if you writing this function,you are not using an arrow function,because if you will write arrow function, it will break things up.Why arrow function will break things up??I will tell you in a while.
userSchema.methods.getJWT = async function () {
  //*whenever you create an instance of a model, all these objects,documents inside the collection are the instances of this User class/model/constructor function.

  //&this keyword here basically represents that particular instance.this keyword only works with the normal functions.Arrow functions does'not have their own this keyword.

  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

//*There is basically one more method that we can create is which is attached to userSchema to validate the password.Remember we used bcrypt library for validating the passwords.I was using bcrypt.compare().I can just offload this also.

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
