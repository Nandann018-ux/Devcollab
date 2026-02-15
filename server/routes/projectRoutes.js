import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createProject,
  getMyProjects,
  addMember,
  getProjectMembers,
  removeMember,
  updateProject,
  getAdmin,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.get("/:projectId/members", protect, getProjectMembers);
router.post("/:projectId/members", protect, authorizeRoles("admin"), addMember);
router.delete("/:projectId/members/:memberId", protect, authorizeRoles("admin"), removeMember);
router.put("/:projectId", protect, updateProject);
router.get("/admin", protect, authorizeRoles("admin"), getAdmin);

export default router;
