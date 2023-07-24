import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: String,
  likes: [{ type: String }],
  dislikes: [{ type: String }],
});

const Comment = mongoose.model("comment", commentSchema);

const postSchema = new mongoose.Schema({
  postText: String,
  postVideo: String,
  postLikes: [{ type: String }],
  postComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
