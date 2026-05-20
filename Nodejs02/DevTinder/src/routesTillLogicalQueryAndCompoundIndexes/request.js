import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequests.js";
import { User } from "../models/user.js";

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

      //~There is one more corner case which is left.What if Elon tries to send the connectionRequest to Elon once again.We have not handled that case also.Now I can also write the code to fix it.So I can basically check that whether my fromUserId === toUserId.Here let me introduce a new concept to you.Remember we created Schema methods.Similarly we can create Schema validations also.See you can write this logic in the if Block and you can handle it also.Remember we can create Schema methods.Similarly we can also create Schema pre.Let us meet at the connectionRequests Model.

      //?Now let me send a connectionRequest to Mark also.

      //?Now let me just ignore "Mark", suppose if I left swipe Mark.So let us just ignore the profile of Mark.Basically inside res.json({}),I should basically give a different message if I am ignoring any profile.

      //~One more concept is left is left === that is How can we put index into our database?Very Very important concept.See I am sending a lot of connectionRequests.Let say I have sent 3 connectionRequests.Now there are 1000 people using your app.These 1000 people are sending 1000 * 100 connectionRequests,so what will happen is our connectionRequests collection will have how many records ??I will have 1 lakh records, is'nt it.As my collection will grow,my queries will become expensive.When I say Query will become expensive that means whenever I will do a findOne/find on something,these queries will become very very slow because at the end of the day,database has to deal with so much of data.Think about 1 million records into your database.1 million connectionRequests.When you scale the database it becomes very tough for db to handle all these things.For that you need indexes in your database.You can index your database onto certain fields.When I index my db,my api's become faster.

      //?Role of Indexes === Suppose if you have 1 million records.In your 1 million users,suppose there are 100 people with the name Virat.Virat Kohli, Virat Singh, Virat Saini..And you want to find any user with the username.Suppose if you want to do a search query.When I say search query that means I am doing User.find().Whenever I am finding something.If I do by the firstName and there are millions of records.My db will take a lot of time to return me the request.If there are 1 million entries,my db can take 5 seconds, 10 seconds and your API will just wait.DB will take time to find out all the Virats from your whole database.It becomes very tough for doing the search operation.Because db will have to actually go to each entry and find out Oh is he a Virat, is he a Virat, is he a Virat.One by One the db will find out.So how will you find out ??One by One, One by One it will go to each user and find out who all are Virat and will give you the data back.

      //^But if you will keep a index in your database,if you will create a index on the firstName then db will optimise itself like that.Your Query will become very very fast.Suppose If I am creating the firstName as the index.So what will happen whenever I will query something with the firstName,And if I do something like this == User.find({firstName: "Virat"}).And if I have put the index on the firstName,if the firstName index is there.Then this Query will be very very fast.If index is not there,Then the query will be very very slow.As the db will grow,these queries become very very expensive and very very slow.They can become so expensive that they even can hang your database.

      //*So Whenever you are doing some search operation be very mindful of what index you are keeping.For Now I donot need to keep an index on the firstName,because we are not searching anybody from the firstName.We want to keep an index on the emailId because a lot of times we want to find by the emailId.Everytime on login,we find the user by the emailId.Suppose If I donot have an index on my emailId.Then your login api will become very slow because the database will have to go one by one and one by one and check it out where this emailId is present.So emailId should be indexed over here.

      //!But let me tell you a good feature about mongoDB, if you are making a field as unique: true.mongoDB will automatically creates a index for that.But if you want to do it in firstName,then either set it unique:true.Or you can either write "index:true" over here.If you write "index: true" that means this will be indexed.

      //?In my connectionRequest also we are trying to find,whenever we are doing connectionRequest.findOne().Suppose I am having the millions of connectionRequests in my database,Then this query will become very very hard.Whenever I am querying together,fromUserId and toUserId $OR.So I basically need to index them both.So here the index that we need to create is called as Compound Index.Let us again meet at the connectionRequest Model.

      //?Creating the indexes unnecessarily also comes with a cost.Now this is your Homework,find out why ???Why we should not create a lot of indexes into the DB.Because see when you create a index,you donot have to do heavy job, but it takes a very tough time for DB to handle those indexes.db has to store the data in such a way that your Queries become faster.Inside database also there are data structures And Algorithms.Database is built using Trees.When you create a lot of indexes,then it becomes very tough for db also to handle those indexes.Donot create like random indexes when you dont need it.Always be very specific about what indexes you create.
      
      //&One more validation can be there,what is in place of _id I try to sent something random like xyz ?? like === "http://localhost:7777/request/send/interested/xyz".What will happen now ??If I try to send the connectionRequest to some random user "xyz".So see mongoose will throw the error == "ERROR: Cast to ObjectId failed for value "xyz" (type string) at path "fromUserId" for model "ConnectionRequest".Because we have basically done a Schema level validation,So let me now take a random objectId which does'not even exists in my DB.I am basically taking a random mongoDB id.If i hit the send button on the POSTMAN,see that the connectionRequest was completed.connectionRequest was made.I am basically sending a connectionRequest to a person,which is not even there in my database.So we have not checked wheteher if I am sending the connectionRequest to this _id that whether this user even exists in my database or not.I have not made a check.User or attacker can do anything.attacker can send anything in your api.How will I validate it ??So basically I have check the allowedStatus and now I will check if this toUserId is an existing user or not.

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      //*If there is an existing ConnectionRequest,see I send the connectionRequest to the Elon,now I will basically check from the code that whether the connectionRequest from PersonA to PersonB already exists or if there is a connectionRequest already pending from PersonB to PersonA,so in both the cases I will not be able to allowed to send the connectionRequest once again.

      //?Now I will also check if Elon has sent the connectionRequest to me already then In that case also I should not be able to send the connectionRequest to Elon.I will check that thing in the above Query only,so what I will do is,I will basically use the OR condition in the above query.So you basically write $or.In $or,you basically pass an array,and you basically pass the array of conditions.

      //?Again see suppose I sent a connectionRequest to Elon.so connectionRequest will be sent to Elon and stored inside our database.But now If I try to send this once again,so it should not happen.The other thing which should not happen is !=== Elon should not be able to send the connectionRequest to me.This is the OR condition.If the fromUserId, toUserId already exists or this is basically the second condition.basically you are trying to make a duplicate connectionRequest.Now once I have sent the connectionRequest to Elon,now I cannot sent to Elon again and Elon cannot sent to me.
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId }, // A → B
          { fromUserId: toUserId, toUserId: fromUserId }, // B → A (reversed)
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Already exists",
        });
      }

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
        message:
          req.user.firstName +
          " " +
          "is" +
          " " +
          status +
          " " +
          "in" +
          " " +
          toUser.firstName,
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
