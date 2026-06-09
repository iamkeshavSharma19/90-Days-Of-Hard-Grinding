import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 7778;

console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);

const returnedValue = connectDB();

console.log(returnedValue);

console.log(returnedValue);

connectDB()
  .then((res) => {
    console.log(res); //mongoose object

    console.log("Database connection established");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`App is listening on Port ${PORT};`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
