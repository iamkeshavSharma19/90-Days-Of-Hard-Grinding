//^This model and this file will define the connection between the two users.
import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    //?In the connectionRequest what information should I store ?
    //?There would be a user which is sending the connection request to some other user.I would need the identity of this user and I would need the identity of the sender and the receiver and then I would also need what is the status of that connection request ??Let me name them as fromUserId, toUserId.

    //?Our connection request should have a mandatory required field over here.

    fromUserId: {
      //?this is basically the same _id which mongoDB stores.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      required: true,
      //*you create a enum whenever you want to restrict user for some values,you can create a enum at the place where you want to restrict user for some values.Suppose If I want that status should only have some certain values,Status can just be only 4 === ignore, interested, accepted and rejected.These are the only 4 things that can come into a status.Apart from everything else,should throw an error.This is the enum.Now I would say that okay that we will make an enum using these 4 values.
      //!the type of this status is string,because it is a string at the end of the day.But this enum will define that what values are accepted in the form of string.Apart from that no value will be accepted.This is kind of like a schema level validation.
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        //?Suppose if somebody is trying to add something else inside this enum,suppose if somebody is adding "xyz" into the status,so what will happen is db will throw an error,the schema will throw an error and it will say == "xyz is incorrect status type".

        //~In the userSchema there was a chance to add enum inside the gender,let us meet at the userSchema.
        message: `{VALUE} is incorrect status type.`,
      },
    },

    //&We need timeStamps also, because you send a connection request,you remember if you are from the facebook era,it shows you that okay,If I am sending you the connectionRequest,so it shows that okay,"xyz sent you a connection request 5 minutes ago.".So basically you need a timestamp right.When was that connection request sent??And when was the connectionRequest was accepted,all these things.
  },
  {
    timestamps: true,
  },
);

//?Creating Compound Indexes
//&Basically this 1 over here means the ascending order and -1 means the descending order.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//^There is something known as Schema Pre.Go to the mongoose docs and in the left search bar search "pre".This pre is basically a function.basically you have to google == "mongoose schema pre".This pre is kind of like a middleware.
//*whenever you are writing a schema method or you are writing some pre function,So always try to write normal function, not a arrow function.
//?What is this pre method and when this will be called?This is kind of like a middleware,it will be called everytime,the connectionRequest document will be saved onto our database.Any time you are saving the connectionRequest.whenever you will call a save() method.whenever you will call this save() method over here.So it will be called pre save.That is why the name is pre.This pre means that I am calling this middleware pre save.This "save" here is basically kind of like an event.It is kind of like a event handler.Before I save the document this function will be called.So you can basically do a lot of validations as well as check over here.
connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  //!Check if the fromUserId is same as toUserId.This is kind of like a validation before saving.
  //!But you cannot directly compare the ObjectId,the type of this fromUserId is ObjectId._id is present inside the ObjectId,it is not a string exactly.So basically you have to parse things up.basically there is a function equals.
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }

  //&This happens before you saving the document,everytime before you save,this middleware function will be called.
  //?you can this same thing at the API level also.
  // next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

export default ConnectionRequestModel;
