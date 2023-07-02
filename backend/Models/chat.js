import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  messages: [{}],
});

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
