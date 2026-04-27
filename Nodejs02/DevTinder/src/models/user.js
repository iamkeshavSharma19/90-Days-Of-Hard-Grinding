import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //?we will add some strict checks over here in the database and basically if those checks are not met,we will not insert the document into our database.

    //*Go to the official documentation of mongoose, on the right hand side go to the schemaTypes over there.This basically tells you more about information about what can be the different types inside your schema.

    //&If I want that there should be some mandatory fields inside our database.If those fields are not there,we will not create our user document.What can be these fields.It can be email,It can be password,It can be firstName, lastName these are kind of like required fields,these are mandatory fields which are required to sign up a user.Suppose if a user is signing up you should atleast know his firstName,emailId and password right?Otherwise How would you register a user onto the platform??These are mandatory fields.

    //~you can basically add a required field over here.

    //~ I want If a user registers onto our platform then he should definitely have a firstName and he should definitely have a lastName.

    //?Another important check is basically a unique check, suppose if I want in my database that there should be only one entry with one email id,there cannot be the 2 different users with the same email id.for that you have to keep emailId as the unique field.you can basically pass a unique flag.This unique flag is a also a boolean flag over here.

    //*Suppose if i also want to add a default value,suppose If I want that whenever a user registers so it should take some default value.When I will create the userSchema, it can also take a photoUrl.So let us also store a photoUrl.it is basically the link to the photograph of the user.

    //todo=== there can also be a kind of like a short description basically like about section or on instagram you might have seen that bio, headline on the linkedin.Something like that.Let us also add that about field inside my userSchema.Let us also add one more field i.e skills.And you can also add a default value for some users.

    //&Whenever you will have schema,with [String] i.e array of strings or something, so mongoDB by default creates an empty space for your array so basically that's a default behaviour.

    //&Whenever a new user will register,without an About Section,so the default About will be the default value which we have added in the schema.Similarly you can also add a default photo url.

    //~Suppose If somebody is entering their emailId in the capital letters like inside the random cases.To keep ypur emailId's consistent,you can add lowercase flag into the emailId.

    //~Similarly I can also add much more  checks.

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
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      //?Suppose if you are having type as a number, then you can also add the min value and the max value,suppose on the age only I want my users should be atleast of 18 years of age,to sign up on the Dev Tinder
      min: 18,
      type: Number,
    },
    //~Now suppose if I want to add some more complicated checks, suppose If I want to check if the gender is either a male or a female or others.There can be only three gender types === male, female or others.How do you check that ??Basically I am trying to show you How to add a custom validation function.How to basically create a custom validation function.You just have to write a function validate and this function takes a value and now I can keep a check of value over here.

    //~How this validate function works ??As soon as the data is being put into the database, these validations will run and the value which is being passed to the database will first of all go through this validate function if this validate function does'not throw any error then everthing will work perfectly fine, the data will be successfully inserted into the database, otherwise if this validator function throws some error then your database will not be updated.Let us now update or patch a user and write his gender as "hello", will it insert into the database or not ?? the answer is Yes the data with gender "hello" will be successfully inserted.Why it happened?So, basically I added a validation over here,but now my validations are not working because by deafult this validate method will only be called when this new document is created.

    //~This validate function will only run when you are creating a new object.But if I am trying to patch an existing data this validate function will not run by default.You will have to enable it to run on updates (patch) also.

    //&In the docs let us go back to the update method === we are basically using findByIdAndUpdate query.In the right side bar inside the API === Go to the model.Inside the model find the query === findByIdAndUpdate.Under the options you will find runValidators.this runValidators over here means that by default runValidators is off when updating the document.Inside the options if I pass runValidators: true,then it will run.
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
      //!Now whatever case user may use,but the email id will be stored in the lowercase format.Whatever the user is sending, we will just store it how we want to,I want all my email id's to be unique , they should always be in lowercase
      lowercase: true,
      required: true,
      //! unique:true will not let me insert the same emailId into my database.If I will try to pass then mongoose will throw this error === Error saving the user:E11000 duplicate key error collection: devTinder.users index: emailId_1 dup key: { emailId:

      unique: true,

      //!there is also a function for trim suppose if the user is kind of sending the email id with some spaces,there are some spaces in the front and then there are some spaces in the back.A new user can be created with the same email-id but with spaces, MongoDB treated that email id with spaces as a different email id and a new user was inserted into our database.Ideally we should trim our email id's.Ideally we should trim our email id's before we save it onto our database.I donot want spaces in my email id.trim will remove the extra spaces from the front and back only.
      trim: true,
    },
    photoUrl: {
      type: String,
      //&Adding a default image url over here.So if you dont give a photo then by default it will take this below photo url.Let us enter Mark Zuckerberg into our database.
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
      type: String,
      //~Adding a default value
      default: "This is a default description about the user",
    },
    skills: {
      //& user can have multiple skills, a user can have javascript, java full stack, nodeJS and so on.It is kind of like a array of skills.
      type: [String],
    },
  },

  //*Last thing is Right now I am not storing anywhere that when this user was registered ??I am not storing any time stamp I am not storing any date

  //*Inside the docs on the right hand side Go to the time stamps === it will tell you that you can pass something as {Timestamps: true} over here.

  //*Let me create a new user and show it to you.Let us sign Up Randy Orton.

  //*these time stamps are important, you should know when the user was registered, when the profile was updated and you should know all these information.

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
