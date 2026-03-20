import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All team routes require authentication
router.route("/").get(protect, getTeams).post(protect, createTeam);

router
  .route("/:id")
  .get(protect, getTeamById)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

// Member management sub-routes
router.post("/:id/members", protect, addMember);
router.delete("/:id/members/:userId", protect, removeMember);

export default router;
