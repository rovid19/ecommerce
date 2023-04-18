import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productBought: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  productShipped: { type: Boolean, default: false },
  productQuantity: { type: Number, default: 1 },
});

const saleModel = mongoose.model("sale", saleSchema);

export default saleModel;
