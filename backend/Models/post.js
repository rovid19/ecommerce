import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: String,
  commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: [{ type: String }],
  dislikes: [{ type: String }],
});

const Comment = mongoose.model("comment", commentSchema);

const postSchema = new mongoose.Schema({
  postDate: String,
  postAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postText: String,
  postVideo: String,
  postYoutubeVideo: String,
  postProduct: {},
  postLikes: [{ type: String }],
  postComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const Post = mongoose.model("post", postSchema);
export { Post, Comment };
