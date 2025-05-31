// socket.js
"use client";

import { io } from "socket.io-client";

const URL = "http://localhost:5001";

const socket = io(URL, {
  autoConnect: false, // Prevents auto-connection until you call `connect()`
});

export { socket };
