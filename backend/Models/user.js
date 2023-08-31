import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: "store" },
  addToCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  profilePicture: {
    type: String,
    default:
      "https://gymtok-photo-video-upload.s3.amazonaws.com/1689844678127.png",
  },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "sale" }],
  shippingDetails: [
    {
      address: String,
      addressDva: String,
      country: String,
      postalCode: String,
      region: String,
      phoneNumber: Number,
    },
  ],
  reviewsLeft: [],
  chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
  allChat: [],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  notifications: [],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
