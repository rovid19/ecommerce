import express from "express";
import { getUser } from "../Controllers/user.js";

const router = express.Router();

// router.get("/get-user-store", getStore);

router.get("/get-logged-user", getUser);

export default router;
