import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import eventsRoutes from "./routes/eventsRoutes.js";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applications.js"; 

const app = express();

// Middleware
app.use(cors());
app.use(json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes); // ✅ Use after defining
app.use("/api/events", eventsRoutes);
app.use("/api/upload", uploadRoutes);

// Mock API for Testing
app.get('/api/events', (req, res) => {
  res.json([
    { _id: 1, title: 'Event 1', description: 'Description 1', approved: false },
    { _id: 2, title: 'Event 2', description: 'Description 2', approved: true },
  ]);
});

// Ensure MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// WebSocket Server
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("sendMessage", (message) => {
    console.log("New Message:", message);
    io.emit("receiveMessage", message);
  });

  socket.on("new-event", (event) => {
    console.log("New Event Received:", event);
    io.emit("update-events", event);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Default Route
app.get("/", (req, res) => res.send("API is running..."));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
