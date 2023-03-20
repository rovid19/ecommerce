import express from "express";
import { editStore, uploadStoreImage } from "../Controllers/store";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer destinacija za slike
const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });

const router = express.Router();

router.put("/edit-store", editStore);

router.post(
  "/upload-profileImage-store",
  photosMiddleware.array("photo", 100, uploadStoreImage)
);

export default router;
