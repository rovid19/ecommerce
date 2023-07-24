import express from "express";
import {
  editStore,
  uploadImage,
  addProduct,
  getStoreProducts,
  deleteProduct,
  getCurrentProduct,
  editProduct,
  newProductArray,
  fetchStoreData,
  getOrders,
  confirmOrder,
  cancelOrder,
  getDailySales,
  getTotalSales,
  getLast5,
  getTrendingStore,
  getAllStores,
  getAllProducts,
  getMostSoldProduct,
  uploadVideo,
} from "../Controllers/store.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer destinacija za slike
const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });

//multer za video
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.put("/edit-store", editStore);

router.post("/upload-image", photosMiddleware.array("photo", 100), uploadImage);

router.post("/upload-video", upload.single("video"), uploadVideo);

router.post("/add-product", addProduct);

router.get("/get-store-products", getStoreProducts);

router.post("/delete-store-product", deleteProduct);

router.post("/get-current-product", getCurrentProduct);

router.put("/edit-product", editProduct);

router.post("/save-sorted-products", newProductArray);

router.post("/fetch-store-data", fetchStoreData);

router.post("/get-orders", getOrders);

router.post("/confirm-order", confirmOrder);

router.post("/cancel-order", cancelOrder);

router.post("/get-daily-sales", getDailySales);

router.post("/get-total-sales", getTotalSales);

router.post("/get-last-5-sales", getLast5);

router.get("/get-trending-store", getTrendingStore);

router.get("/get-homepage", getAllStores);

router.get("/get-products", getAllProducts);

router.get("/most-sold-product", getMostSoldProduct);
export default router;
