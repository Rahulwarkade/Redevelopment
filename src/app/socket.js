"use client";

import { io } from "socket.io-client";

let socket;

if (!socket) {
  socket = io("http://localhost:5001", {
    autoConnect: false, // Prevent auto connection on import
  });
}

export { socket };