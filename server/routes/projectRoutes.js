import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createProject,
  getMyProjects,
  getAdmin,
  addMember,
  getMembers,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject); 
router.get("/", protect, getMyProjects); 
router.get("/my-projects", protect, getMyProjects); 
router.get("/admin", protect, authorizeRoles("admin"), getAdmin); 


router.post("/:projectId/members", protect, authorizeRoles("admin"), addMember); 
router.get("/:projectId/members", protect, getMembers); 

export default router;
