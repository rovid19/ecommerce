import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: String,
  storeDescription: String,
  storeProfile: String,
  storeCover: String,
  storeAddress: String,
  storeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  storeCollections: [
    { type: mongoose.Schema.Types.ObjectId, ref: "collection" },
  ],
  storeSales: [{ type: mongoose.Schema.Types.ObjectId, ref: "sale" }],
});

const Store = mongoose.model("store", storeSchema);

export { Store };
