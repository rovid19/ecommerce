import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import storeRoute from "./Routes/store.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://ecommerce-frontend-i3h3.onrender.com",
    ],
  })
);
app.use(express.json());
app.listen(PORT);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/store", storeRoute);

app.use("/uploads", express.static(__dirname + "/uploads"));
