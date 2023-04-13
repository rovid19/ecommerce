import express from "express";
import {
  setProductToCart,
  getProductsFromCart,
} from "../Controllers/customer.js";

const router = express.Router();

router.post("/add-product-to-cart", setProductToCart);
router.get("/get-products-from-cart", getProductsFromCart);
export default router;
