import express from "express";
import { userAuth } from "../middlewares/auth.js";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.send(`${user.firstName} sent the connection request`);
});

export default requestRouter;
