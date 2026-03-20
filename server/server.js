import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

// Middleware setup
// cors() allows the React dev server (port 5173) to call this API (port 5001)
app.use(cors());
app.use(express.json()); // Parse incoming JSON request bodies

// API Routes
app.use("/api/auth", authRoutes);       // /api/auth/register, /login, /me
app.use("/api/users", userRoutes);      // /api/users — legacy user routes
app.use("/api/projects", projectRoutes); // /api/projects — CRUD
app.use("/api/teams", teamRoutes);       // /api/teams — CRUD + members
app.use("/api/messages", messageRoutes); // /api/messages — messaging

// Health check — quick way to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "DevCollab API is running 🚀", version: "2.0.0" });
});

// MongoDB connection — using async/await inside the then chain is intentional
// mongoose.connect returns a Promise; no need for a separate async function here
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5001, () => console.log("🚀 Server running on port 5001"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit process on DB failure — no point running without DB
  });
