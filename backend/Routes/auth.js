import express from "express";
import { registerUser, loginUser, logoutUser } from "../Controllers/auth.js";

const router = express.Router();

router.post("/register-user", registerUser);

router.post("/login-user", loginUser);

router.post("/logout-user", logoutUser);

router.get("/test", async (req, res) => {
  res.json("0kokok");
});

export default router;
