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

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());
//&Adding the cookie-parser middleware,whenever any request will come,my cookies will be parsed and I can now access those cookies.Now when the request will come I will be able to read the cookies back.
app.use(cookieParser());

//&Now finally the time has come to create our Auth Middleware.I want all my api's to be secure.All these api's should only work after the authentication,after the user has successfully logged In.Otherwise they should not work.Only 2 api's signUp and login should work without the authentication.Otherwise all the api's should work after the authentication only.Right now my profile api is strong now,All the other api's does'not have a token check.So I will basically create a auth middleware,and I will validate the token over there.

//~Inside the src,create a new middlewares folder.Inside that middleware create a new file === auth.js

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);
    //!this below way is the very bad way of creating an instance to directly get the req.body and pass everything inside it.

    //!A good way is to explicitly mention all the fields
    // const user = new User(req.body);
    //!So what all fields I want
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log(user);

    if (user?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    await user.save();
    res.send("User Added successfully");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // console.log(emailId);
    // console.log(password);

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassWordValid = await bcrypt.compare(password, user.password);

    if (isPassWordValid) {
      //^Suppose if the email as well as the password is validated then here I will write the whole logic about the cookie and the Jwt token.

      //*Now let me tell you what is a jwt token.Pls visit jwt.io official website.JWT token is known as JSON web token.This is basically a industry standard.It generates a token and it is a very unique token,and it has some secret information embedded inside it.JWT token is also like a password hash kind of like a thing.It is not exactly a password hash,it is implemented on a very different logic.We donot have to take care about how the JWT tokens are made.But you can assume that it is an encrypted hash.Now this JWT token can contain special information inside them.Let me tell you that how we can create these JWT tokens and how we can use it.On the official docs did you notice three things over here.One is the orange thing, one is the purple thing and one is the green thing.This token is divided into 3 things.One is the header,one is the payload and one is the signature.This orange thing is the header.purple thing is the payload or the data or the secret data which I will hide inside this token.I can hide some data inside this token from the server.This green thing is the signature.This is the signature which jwt uses to check whether this token is validated,this token is actual or not.Suppose an attacker tries to play with your token.So this signature will not match it.The signature should be perfectly valid.

      //^ let me now tell you how to create this jwt token and how do you put it inside the cookie and send back.for that we will be using one more npm package which is known as jsonwebtoken.This is a very famous library for creating json tokens.Inside it we are having methods like jwt.sign() and jwt.verify().jwt.verify() is used for the verification and jwy.sign() is used for creating the token.

      //~Let us first of all install the jsonwebtoken package. "npm i jsonwebtoken"

      //&Step 1 === Create a JWT Token
      //&When I am creating a token I can basically hide some data,what I will hide is,I will hide the userId.Basically when you hit the login api,this emailId will come,Now I will find in my database that whether this emailId exists or not? and whether the password is valid or not?If this emailId and password comes in.And my email and password is validated._id is the same object_id of the user which is present inside the mongodb.

      //?I am hiding this userId inside this token and I will also give a secret key over here.This secret key is basically a password that only I know.This secret key is a password which only server knows.user dont know it.Attacker dont know it.Nobody knows this password.Only the server knows this password.So I am hiding this data and I am also giving a secret key,this secret key is very very important.So basically I am hiding this data i.e === _id: user._id inside this token.

      //*let me now tell you that how we can expire the jwt token.Let us go back to the documentation of the JWT token.In the jwt.sign() method you can basically pass the options like === {expiresIn: 1h}

      //^just for fun === 0d == 0 days means that created a token and it is already been expired.If i send a GET API call to "/profile" it will give the error == ERROR: jwt expired.

      //!Along with the token,you can also expire your cookies,Go to the expressJs.com docs,and search over here the cookies and go to the res.cookies.

      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      //!After this I will send this token back to the user.

      //!Basically everytime I hit the login api,everytime this jwt token is new and unique and it is not the older token,and this new unique token always replaces the older token stored inside the POSTMAN.

      //!Now this token is also having the secret information about who has logged in.And the userId is also hidden inside this token.You know it and the server knows it.

      //^And suppose if somebody gets the token,there is a very famous attack in hacking that is known as cookie hijacking/session hijacking.So basically people steals cookies,you might have heard that cookies has been stolen.So when you steal somebody cookies,suppose if I get to know your cookie,then I can access your private information also.That is how it works.

      //*Once I have got this token,now if i send GET request to "/profile"and if i hit enter,it would have got this cookie and inside this cookie I have got this token back,Now I will verify this token,let us meet again at the "/profile" api.

      //~Step2 === Add the token to cookie and send the response back to the user

      //?Suppose you are sending some response back, so the express gives you a best way to attach a cookie.Go to expressJS.com website.In the search bar search for the res.cookie and you will basically find out how to set a cookie.This is basically a random JWT token.

      //?When I send this cookie res.cookie() and I send this random big token and then I send this response back i.e Login Successful.Now let us see what will happen.

      //*In the postman,below the send button,you will basically see a cookies section and when you will click on the cookies,it will show you all the cookies.Now let me login and hit the /login api.So when I login it is showing me login successful, nothing changed,but this time something interesting happened,that interesting thing is that we would have got the cookie back from the server.I would have got the cookie back from the server.cookie will come in the cookies section of postman.If you open the token,I have got the token back.

      //&so i send the login api call,I created a cookie and entered a token and then this cookie is sent back to the user.Now I will make an api call to my profile api.Let me create a "/profile" api very quickly.Let us meet at the "/profile" api.

      //^Now the login job is done.When the user is coming with the emailId and password,and the emailId and the password is correct.Creating a token,hiding the userId inside it and then sending it back to the user.Now let me hit the "/login api"

      res.cookie("token", token);
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//~Profile API
//~Suppose if somebody is making an api call to "/profile",so first of all it will go the userAuth middleware,it will check for the token and it will validate the token,it will find the user over there,it calls the next route handler function.if the middleware code does'not pass,then the below request handler will not even be called.
app.get("/profile", userAuth, async (req, res) => {
  //~Now whenever my profile api will be called,now basically I want to validate my cookie.
  //~This is how I will get the cookie.In the expressJS docs also you can search for the req.cookies When you do req.cookies like this it basically gives back you all the cookies.
  //!On the postman let us make an GET api request to the profile api call.If i send the request and hit enter.In the console it is giving me undefined.Basically I am not able to read my cookies back.That means cookies over here is undefined.To read the cookie we need one more npm library we basically need a middleware which is known as cookieParser.So whenever you want to read a cookie you basically need to parse that cookie and then you will be able to read that cookie.This middleware,this npm package is known as cookie-parser.This cookie-parser is also developed by the ExpressJS Team.so let us install === "npm i cookie-parser".After installing it I will just add this middleware on the top.

  //todo===Recap:Let me just recap it once again,whenver you are logging in,as soon as you hit the login api,I will set the token inside the cookie and I will give you back the cookie,Now it is the job of the POSTMAN or it is the job of the client,majorly our client is browsers.So POSTMAN is also working similar to the browsers.The job of the browser is to read those cookies and keep it safely.And whenever I am requesting any other api call,please send back the cookie,whenever I am making any api call.Please send back the cookie whenever I am making any api call.This is the job of the browser."/login" just injects the cookies into the browsers,into the client.And the client will get the cookie back.Now suppose if I want to secure my profile api.
  try {
    //const cookies = req.cookies;
    //?After using this middleware,I basically have got my cookie back.
    //console.log(cookies);
    //&So i will get back my cookie,now I will extract the token from this cookie and then I will just write the validation logic.
    //const { token } = cookies;
    //&Now I will basically validate my token and if the token is valid,then I will give the response back,otherwise I will say Please Login.

    //?If I do'nt receive or get the token.
    // if (!token) {
    //   throw new Error("Invalid Token.Please login first");
    // }

    //~Validating the token === So I will basically use the method which is given to us by JWT and it is known as jwt.verify().This jwt.verify() does'not give you a boolean.It basically gives you a decoded value.This decodedMessage is nothing but the userId.This iat is something which is used by jwt.

    //~Everytime you log in,it will basically create a new token.But the userId will always be hidden inside that new token.

    //?I can just read my _id from this decoded message is'nt it?

    //?Now basically I have got the information about the loggedIn user.

    //?Let us signUp one more user as the Brock Lesnar.Now let us login the Brock Lesnar.

    // const { _id } = decodedMessage;

    //console.log("Logged In user is " + _id);

    //&I want to get the profile back so let us find the user in the database

    // const user = await User.findById(_id);
    //!Now suppose if the token is valid,but the user does'not exists in our database.

    //!You make an api call but your api call does'not work,it will only work with the token.And the only way to get the token is === by calling the "/login" api.

    //~When we say the cookie hijacking or cookie stealing,that means if somebody steals your cookies,then I can just use this cookie to access all the api's of the logged in user.This is known as the cookie hijacking.Any random attacker cannot steal your cookies until they get access to your computer or you write some javascript into the console to give them access to the cookies.
    // if (!user) {
    //   throw new Error("User does'not exist");
    // }

    //console.log(decodedMessage);
    //~Let me send the user back === I will get the BrockLesnar profile back.

    //^Now if I clear the cookies from the POSTMAN,now there is basically no cookie.Now if somebody hit the api request on "/profile",I will basically not get the response back because there is no cookie.Let us handle the corner cases also.Now suppose If my token is not present.

    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
  // res.send("Reading Cookie");
});

//&Let us make one more api to send the connection request.
//&I just want this api to be hit only if the user is logged in.
//&I just have to add the userAuth middleware and everything would be naturally be taken care of.Now this api is very very secure.
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //^Sending the connection request
  //^I can also see that who has send the conenction request because the userAuth has added the user on the req

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
