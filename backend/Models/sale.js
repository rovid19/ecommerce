import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  productShipped: { type: Boolean, default: false },
  productQuantity: [{ type: Number, default: 1 }],
  orderPlacedDate: String,
  noteToSeller: String,
});

const saleModel = mongoose.model("sale", saleSchema);

export default saleModel;
