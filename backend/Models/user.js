import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  storeName: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: "store" },
  role: String,
  addToCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
