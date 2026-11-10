import express from "express";

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

//&Now if I do something like this ==> Now if I go to the route "/hello/2",so the request will again not come to the below route handler,the request will still go to the above route handler and "Hello Hello Hello" will be printed.Why ??

//?As soon as this request comes from the browser,it will check the "/hello" route handler,and "hello/123" will exactly match this route and that's why the request will go to the first route handler only.

//~But what is I again change the order,let us see at app05.js

app.use("/hello/2", (req, res) => {
  res.send("Abracadabra");
});

app.use("/test", (req, res) => {
  res.send;
});

app.use("/", (req, res) => {
  res.send("Namaste Keshav!");
});

app.listen(7777, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is successfully listening on port 7777...");
});
