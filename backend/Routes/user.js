import express from "express";
import {
  getCollections,
  getUser,
  addCollectionItem,
  deleteCollection,
  collectionChange,
} from "../Controllers/user.js";

const router = express.Router();

// router.get("/get-user-store", getStore);

router.get("/get-logged-user", getUser);

router.get("/get-collections", getCollections);

router.post("/add-collection", addCollectionItem);

router.post("/delete-collection", deleteCollection);

router.post("/collection-name-change", collectionChange);

export default router;
