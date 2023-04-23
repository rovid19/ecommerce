import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: String,
  storeDescription: String,
  storeProfile: String,
  storeCover: String,
  storeAddress: String,
  storeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  storeSales: [{ type: mongoose.Schema.Types.ObjectId, ref: "sale" }],
});

const storeModel = mongoose.model("store", storeSchema);

export default storeModel;
