import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  productCollection: String,
  productPicture: [String],
  productDescription: String,
  productRating: Number,
  productNewPrice: Number,
  productOldPrice: Number,
  productSold: { type: Number, default: 0 },
  productCurrency: String,
  productReview: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  productRating: [],
  productScore: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },

  store: [{ type: mongoose.Schema.Types.ObjectId, ref: "store" }],
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
