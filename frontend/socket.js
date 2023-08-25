import { io } from "socket.io-client";

const socket = io.connect("https://ecommerce-production.up.railway.app");

export default socket;
