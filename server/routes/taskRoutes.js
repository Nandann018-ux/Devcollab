import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protect, createTask);
router.get("/project/:projectId", protect, getProjectTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);

export default router;
