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
import Chat from "./Models/chat.js";
import { createServer } from "http";

const app = express();
//const PORT = 5000;
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
mongoose.connect(process.env.MONGOOSE_CONNECT);
// Websocketi
const httpServer = createServer(app);
httpServer.listen(port);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "https://rocks-market.up.railway.app"],
  })
);
app.use(express.json());
//app.listen(port, "0.0.0.0");
//app.listen(PORT);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/store", storeRoute);
app.use("/api/customer", customerRoute);

app.use("/uploads", express.static(__dirname + "/uploads"));

const io = new Server(httpServer /*4005 port*/, {
  cors: {
    credentials: true,
    origin: ["http://localhost:3001", "https://rocks-market.up.railway.app"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected with socket id ${socket.id}`);
  const handleChange = () => {
    socket.emit("newChat");
  };
  const chatChange = Chat.watch();

  chatChange.on("change", handleChange);

  socket.on("disconnect", () => {
    chatChange.removeListener("change", handleChange);
    chatChange.close();
  });
});

// MODEL WATCH
