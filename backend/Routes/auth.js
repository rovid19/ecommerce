import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../Controllers/auth.js";

const router = express.Router();

router.post("/register-user", registerUser);

router.post("/login-user", loginUser);

router.get("/get-logged-user", getUser);

router.post("/logout-user", logoutUser);

export default router;
