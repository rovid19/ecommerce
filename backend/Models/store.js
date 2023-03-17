import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: String,
  storeDescription: String,
  storeProfile: String,
  storeCover: String,
  storeAddress: String,
  storeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const storeModel = mongoose.model("store", storeSchema);

export default storeModel;
