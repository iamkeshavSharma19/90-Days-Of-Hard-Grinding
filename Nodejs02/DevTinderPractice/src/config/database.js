import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const promiseResult = await mongoose.connect(process.env.MONGODB_URI); //mongoose object
    console.log("Checking Async And Await");
    console.log(promiseResult);
    return promiseResult;
  } catch (error) {
    console.log(error);
  }
};

