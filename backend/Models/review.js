import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  commentBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comment: String,
  rating: { type: Number, default: 1 },
  pictures: [{ default: "", type: String }],
  commentOn: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
