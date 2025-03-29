import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Join WebSocket connection
export const joinWebSocket = (user) => {
  socket.emit("join", user);
};

// Send chat message
export const sendMessage = (message) => {
  socket.emit("chatMessage", message);
};

// Listen for incoming chat messages
export const onMessage = (callback) => {
  socket.on("chatMessage", callback);
};

// Listen for new job posts
export const onJobPostUpdate = (callback) => {
  socket.on("jobPostUpdate", callback);
};

// Listen for new event updates
export const onEventUpdate = (callback) => {
  socket.on("eventUpdate", callback);
};

// Handle disconnection
export const disconnectWebSocket = () => {
  socket.disconnect();
};

export default socket;
