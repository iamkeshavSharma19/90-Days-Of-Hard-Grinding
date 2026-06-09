import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 7778;

console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);

connectDB();

app.listen(7777, () => {
  console.log("App is listening on the Port 7777");
});
