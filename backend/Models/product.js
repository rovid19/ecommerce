import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  productPicture: String,
  productDescription: String,
  productRating: Number,
  productNewPrice: Number,
  productOldPrice: Number,
  productSold: Number,
  productCurrency: String,
  productReview: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
