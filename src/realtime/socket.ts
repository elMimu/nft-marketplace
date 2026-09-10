import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 2,
  reconnectionDelay: 1500,
  timeout: 3000,
});
