import express from "express";
import {
  createProject,
  getProjects,
  getAdmin,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id/admin", getAdmin);

export default router;
