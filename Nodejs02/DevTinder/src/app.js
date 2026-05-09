import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

//&EP12=== Logical DB Query And Compound Indexes.

//&For sending the connection Requests,do not mess up with your user collection.A reason why we add collections is because it defines something.When we created this userSchema,it was basically defining a user.The identity of a user.Now whenever there are two users,and they are making a conenction,so that connection should have it's own schema,Think about a userA and a userB and there is a line going in between that A is connected to B.Now basically that line,that connection request has it's own schema itself.That is basically the relation between 2 entities,2 entities have their own Schema and that relation has it's own schema.So we will basically create a new collection,where we will keep our connection requests.

//~Inside the models folder create a new file i.e connectionRequests.js.Let us meet at the connectionRequests.js file.


const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use(cookieParser());

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
