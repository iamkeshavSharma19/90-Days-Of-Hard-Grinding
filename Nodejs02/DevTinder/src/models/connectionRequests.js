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

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

export default ConnectionRequestModel;