import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productRating: Number,
  productNewPrice: Number,
  productOldPrice: Number,
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
