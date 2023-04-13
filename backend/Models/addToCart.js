import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const addToCartModel = mongoose.model("model", addToCartSchema);

export default addToCartModel;
