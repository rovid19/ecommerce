import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  commentBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comment: String,
  rating: Number,
  pictures: [],
  commentOn: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
