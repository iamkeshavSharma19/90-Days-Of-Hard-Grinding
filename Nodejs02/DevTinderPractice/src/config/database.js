import mongoose from "mongoose";

export const connectDB = () => {
  const p1 = mongoose.connect(process.env.MONGODB_URI);

  console.log(process.env.MONGODB_URI);

  console.log(p1);

  p1.then((res) => {
    console.log("Promise Resolved");
    console.log(res);
    console.log(p1);
  }).catch((err) => {
    console.log(err);
  });
};


