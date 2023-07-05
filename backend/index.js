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
import customerRoute from "./Routes/customer.js";
import { Server } from "socket.io";
import http from "http";
import Chat from "./Models/chat.js";
import { getAllChat } from "./Controllers/customer.js";

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
app.use("/api/customer", customerRoute);

app.use("/uploads", express.static(__dirname + "/uploads"));

const server = http.createServer(app);

const io = new Server(4005, {
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const chatChange = Chat.watch();

  chatChange.on("change", async (change) => {
    socket.emit("newChat");
  });
});

// MODEL WATCH
