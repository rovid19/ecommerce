import express from "express";
import {
  setProductToCart,
  getProductsFromCart,
  removeProductFromCart,
  profileChanges,
  updateShippingDetails,
  getShippingDetails,
  buyProduct,
  getOrderHistory,
  postNote,
  cancelOrder,
  getStore,
  searchResults,
  getProductStore,
} from "../Controllers/customer.js";

const router = express.Router();

router.post("/add-product-to-cart", setProductToCart);
router.get("/get-products-from-cart", getProductsFromCart);
router.post("/remove-product-from-cart", removeProductFromCart);
router.post("/save-profile-changes", profileChanges);
router.post("/update-shipping-details", updateShippingDetails);
router.get("/get-shipping-details", getShippingDetails);
router.post("/buy-product", buyProduct);
router.get("/get-order-history", getOrderHistory);
router.post("/note-to-seller", postNote);
router.post("/cancel-order", cancelOrder);
router.post("/get-store", getStore);
router.post("/search", searchResults);
router.post("/get-products-store", getProductStore);
export default router;
