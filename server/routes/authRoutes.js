import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes — no token required
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes — require valid JWT via the protect middleware
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

export default router;
