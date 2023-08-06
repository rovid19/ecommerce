import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  collectionName: String,
  collectionProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  ],
});

const Collection = mongoose.model("collection", collectionSchema);

export default Collection;
