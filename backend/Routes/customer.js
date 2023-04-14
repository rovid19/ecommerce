import express from "express";
import {
  setProductToCart,
  getProductsFromCart,
  removeProductFromCart,
} from "../Controllers/customer.js";

const router = express.Router();

router.post("/add-product-to-cart", setProductToCart);
router.get("/get-products-from-cart", getProductsFromCart);
router.post("/remove-product-from-cart", removeProductFromCart);
export default router;
