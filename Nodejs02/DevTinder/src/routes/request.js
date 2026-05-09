import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequests.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //&When you call the userAuth which is basically a middleware,you will get the loggedIn user information inside the req.user.This req.user would be the loggedIn user.This req.user is the person who is sending the connectionRequest.this req.user is basically the fromUser.fromUserId is coming from the loggedInUser information.
      //~Suppose if somebody is logging in,so this userAuth basically finds out wheteher the user is there on the database or not.If the user is there in the database,then it just adds it onto the request object and calls the next(),when it calls the next()i.e I am going to the current request handler.In this request handler when I will receive this req,a user object is already there,which I basically added in the userAuth middleware.
      const fromUserId = req.user._id;
      //?How will I get my toUserId ??  This toUserId will come from my req.params.toUserId
      const toUserId = req.params.toUserId;
      //!And where I will get my status from ??The status while I am sending the connectionRequest,is interested.Can we make it dynamic?Can I use this same api for the left swipe as well as the right swipe?Can I use the same api for interested or ignoring the profile?Can I use the same api work for both??The status over here can be either ignored or interested.So instead of creating an api differently for "interested" or "ignored",I can handle the same thing in the same api.Because at the end of the day it is the same logic that we are going to use.My status will again come from the req.params.status again.
      const status = req.params.status;
      //&Validations
      //~Let us create allowed Status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        //~If you will write return then the code will not move ahead,If you donot write return,then the code will move ahead.
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }
      //*If there is an existing ConnectionRequest,see I send the connectionRequest to the Elon,now I will basically check from the code that whether the connectionRequest from PersonA to PersonB already exists or if there is a connectionRequest already pending from PersonB to PersonA,so in both the cases I will not be able to allowed to send the connectionRequest once again.

      //?Now I will also check if Elon has sent the connectionRequest to me already then In that case also I should not be able to send the connectionRequest to Elon.I will check that thing in the above Query only,so what I will do is,I will basically use the OR condition in the above query.So you basically write $or.In $or,you basically pass an array,and you basically pass the array of conditions.

      //?Again see suppose I sent a connectionRequest to Elon.so connectionRequest will be sent to Elon and stored inside our database.But now If I try to send this once again,so it should not happen.The other thing which should not happen is !=== Elon should not be able to send the connectionRequest to me.This is the OR condition.
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { toUserId, fromUserId },
        ],
      });

      //^So,now we have got all these things now.Now I have got my fromUserId, toUserId and I have also got my status.Now I can just save it in my database.I can save my connectionRequest.Let us create the new instance of the connectionRequest Model.
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      //^Now let us just save the new instance of this connectionRequest Model into our database.
      const data = await connectionRequest.save();
      //*Now I can just send the response back.
      res.json({
        message: "Connection Request Sent successfully!",
        data,
      });
      //*Let us now test this API on the POSTMAN.Let me login with my username and I send a connectionRequest to the Elon Musk.
      //&But there are so many flaws in our connectionRequest API.This is basically the intern level or junior developer code that we have written.But How will you write the expert level code ??
      //&The first thing is that my api has no validations.What if in "/:status",in place of "interested",I pass "accepted" over here.It will store accepted over here in the database that means Elon Musk has also accepted my connectionRequest also.We will not allow the user to accept the request by this API.This api is just for either interested or I can send ignored over here.Nothing else.This api is basically just for either left swipe or right swipe.Either I can do left swipe or I can do right swipe.I cannot accept it.So the connectionRequest status can either go from "ignored" or "interested".I cannot change it to accepted.Either it can be ignored or either it can be interested.So basically you have to validate the data.Let us meet on the top in the comment === "Validations".
      //~Can you think of more issues in our API ??Let me tell you one more issue.Suppose I have sent the connectionRequest to Elon,But what if Elon wants to send the connectionRequest to me once again?See I have sent the connectionRequest to Elon,it is still in the interested phase.But now Elon tries to send the connectionRequest to me.So this should not be valid.What If I try to send the connectionRequest once again to Elon?What will happen if I hit this api once again ??What will happen?A new connectionRequest will be created.Now there would be 2 entries inside my database.See If I have sent a connectionRequest to Elon,so basically I should not be able to send a connectionRequest to Elon once again.And Elon should also not be able to send a connectionRequest to me.So These are the 2 things which we will validate.Let us meet again on the top after the status validation check.
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

export default requestRouter;
