import express from "express";
import {
  editStore,
  uploadImage,
  addProduct,
  getStoreProducts,
} from "../Controllers/store.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer destinacija za slike
const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });

const router = express.Router();

router.put("/edit-store", editStore);

router.post("/upload-image", photosMiddleware.array("photo", 100), uploadImage);

router.post("/add-product", addProduct);

router.get("/get-store-products", getStoreProducts);

export default router;
