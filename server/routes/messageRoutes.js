import express from "express";
import {
  sendMessage,
  getInbox,
  getConversation,
  markAsRead,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All messaging requires authentication
router.post("/", protect, sendMessage);
router.get("/inbox", protect, getInbox);
router.get("/conversation/:userId", protect, getConversation);
router.put("/:id/read", protect, markAsRead);

export default router;
