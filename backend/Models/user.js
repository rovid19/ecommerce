import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  storeName: String,
  role: String,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
