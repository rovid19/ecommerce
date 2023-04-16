import express from "express";
import {
  setProductToCart,
  getProductsFromCart,
  removeProductFromCart,
  profileChanges,
} from "../Controllers/customer.js";

const router = express.Router();

router.post("/add-product-to-cart", setProductToCart);
router.get("/get-products-from-cart", getProductsFromCart);
router.post("/remove-product-from-cart", removeProductFromCart);
router.post("/save-profile-changes", profileChanges);
export default router;
