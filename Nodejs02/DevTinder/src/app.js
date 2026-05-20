import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use(cookieParser());

//&Ep13 === ref,populate And Thought process of writing API'S.Now let us just focus on building our Next API which is the "review/request" API.This review request api is basically for the receiver's end.Suppose if a lot of people are sending me the connection Requests,Suppose you are sending me the connectionRequest,So now I will hit a review api,review means I am reviewing my connection Requests.In the review I can either accept this connectionRequest,or I can reject this connectionRequest.

//~There will be one api for accepting the connectionRequest,and one api would be there for rejecting the connectionRequest.The logic for both these api's will be very very same.You donot have to make 2 different api's for accepting and rejecting the connectionRequest.I will write the code for this API inside the connectionRequest router.Go to the routes folder inside request.js.

app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", requestRouter);

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
