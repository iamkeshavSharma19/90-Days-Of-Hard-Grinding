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
