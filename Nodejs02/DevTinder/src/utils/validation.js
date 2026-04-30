import validator from "validator";

export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error("Please enter all your details");
  }

  //!Now I want to validate the req.body from here

  //!first of all let me take out all the fields from the req.body

  const { firstName, lastName, emailId, password } = req.body;

  //!what if the firstName is not present
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Something went wrong");
  } else if (firstName.length < 4 && firstName.length > 50) {
    //!so you can keep these checks over here or you can also rely on the checks which are there on the Schema level,we have put all these checks on the schema level also.you can keep these checks and return the appropriate error message.

    //!Even if you dont write these validations over here I can get the error message from the schema level validations.
    throw new Error("FirstName should be 4-50 characters");
  }
  //~we will basically use the validator package to validate the email id
  else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

//todo === NOTE === even if some validations are not properly checked by our validate function then also our mongoose schema validations will still be checked by the mongoose before saving any user onto our database.
