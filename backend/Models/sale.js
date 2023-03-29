import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productBought: { type: mongoose.Schema.Types.ObjectId, ref: "productSold" },
});

const saleModel = mongoose.model("sale", saleSchema);

export default saleModel;
