import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  productShipped: { type: Boolean, default: false },
  productQuantity: [{ type: Number, default: 1 }],
  total: Number,
  orderPlacedDate: String,
  arrivalDate: Number,
  noteToSeller: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "store" },
  buyerUsername: String,
});

const saleModel = mongoose.model("sale", saleSchema);

export default saleModel;
