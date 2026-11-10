import express from "express";

const app = express();

//&Now if I go to the "/hello/2" then "Abracadabra" will be printed.

app.use("/hello/2", (req, res) => {
  res.send("Abracadabra");
});

//&But if i go to the "/hello",then again the "/hello" route handler will handle that request and "Hello Hello Hello" would be printed onto the screen.Why??

//~Because when you do "/hello",first of all it goes to the "/hello/2" route handler and it will check that whether the route "/hello" is matching "/hello/2",No it is not matching because it is also having "/2" over here,extra things are over there.So it will not match this and it will go to the "/hello" route handler and "Hello Hello Hello" will be printed onto the screen.

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello");
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
