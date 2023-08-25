import mongoose from "mongoose";
const onSaleSchema = new mongoose.Schema({
  productNewPrice: Number,
  productOldPrice: Number,
  productSalePrecentage: Number,
});

const onSale = mongoose.model("onSale", onSaleSchema);

const productSchema = new mongoose.Schema({
  productName: String,
  productCollection: String,
  productPicture: [String],
  productDescription: String,
  productRating: Number,
  productNewPrice: Number,
  productOnSale: Number,
  productSold: { type: Number, default: 0 },
  productCurrency: String,
  productReview: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  productRating: [],
  productScore: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },

  store: { type: mongoose.Schema.Types.ObjectId, ref: "store" },
});

const Product = mongoose.model("product", productSchema);

export { onSale, Product };
