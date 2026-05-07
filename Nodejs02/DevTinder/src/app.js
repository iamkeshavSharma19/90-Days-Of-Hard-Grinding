import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";
//&After importing all these routes,now I will basically use these routes.
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

//&Right now what we are doing is,we have just 1 app.js file,and we are writing all our api's over here.Suppose If I had 100 of api's,so shall we write 100 of api's in the same file??No

//~Instead we will create the expressRouter,and you handle routing in a proper way using express router.Go to the expressJS documentation,in the left side bar under express Go to the express.Router().Or directly in the search bar search for the express.Router().We will use this expressRouter to manage our api's effeciently,and we will group or api's into the different types of Routers.We will group our api's into the small-small categories,and we will create separate routers for all of them.And those routers will basically handle these routes.

//?How will I distinguish the api's is api's related to Auth like == "/signup", "/login", "/logout".So I can basically create a auth Router.And I will add all these 3 api's inside my authRouter.

//! In your src folder create a routes folder over here.All the routes will be managed by this route folder.Inside routes folder create auth.js file.auth.js file will manage the routes specific to the auth.

//!let us meet at the auth.js file.

//*inside routers folder let us also create a new file with the name as profile.js.See you now in the profile.js file under the routes folder

//~Inside the router folder, create a new file "requests.js" for handling the connection requests (send requests and receive connection requests) basically.

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use(cookieParser());

//^for using the routes you can basically use your router like a middleware.Just like I write any other middleware,I can write my router like this.
//?Whenever a request is coming at "/",go to authRouter and check all the routes inside authRouter that is there a route which is matching ?

//~Now suppose there is an api which comes in like "/login", so request will go to "/" and it will first go to the authRouter,and inside the authRouter it will basically check for all the api's out there == "/signup" and "/login".is it "signup" no, is it "/login" yes.Now it will run the code of api "/login".And if the response is send from "/login" api then it will not go any further.

//!Suppose if somebody is making a request to "/profile",first of all it will go to "/" and it will check "/" is matching with the route "/profile". "/" basically means it will run for all the routes.First of all it will check for "/profile" route inside authRouter,is there a "/profile" no.Now if you do'nt find it , it will go to the next middleware.
app.use("/", authRouter);
//&Now it will check inside the profileRouter,is there a "/profile"route yes!!so it will go inside it and it will return the result.
app.use("/", profileRouter);
app.use("/", requestRouter);

//*Basically the main job of the express is to whenever you get a route,it just tries to go and check for all the routers, all the middlewares, all the request handlers and the only job is to send the response back from wherever it gets the first response.

//^Now go to the express.Router documentation and read the documentation of the express.Router(),you will get to know a lot more amazing things.

//~Now after refactoring a lot of code,let us now test these api's one by one.Atleast let us test the api of auth signUp and login api.Let us signUp "MS Dhoni"

//&we have already created the "/signUp" and "/login" api, now let us create the "/logout" api,we will meet again at the authRouter.

//^Let us now create the "/profile/edit" api and then we will wind up the today session.Let us now meet at the profile.js file.

//?writing the signup logic in the auth.js file inside the routes folder.

//?writing the signup logic in the auth.js file inside the routes folder.

//&Writing the get "/profile" api logic in the profile.js file.

//~Writing the "/sendConnectionRequest" logic in the profile.js

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
