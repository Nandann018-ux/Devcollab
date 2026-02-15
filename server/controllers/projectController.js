import Project from "../models/Project.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    }).populate("members", "name email role");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const projects = await Project.find({}).populate("members", "name email role");
    res.json({ message: "Welcome Admin 🚀", projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { members } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    for (const member of members) {
      const userId = member._id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: `Invalid user ID: ${userId}` });
      }

      if (project.members.includes(userId)) {
        return res.status(400).json({ message: "User already a member" });
      }

      project.members.push(userId);
    }

    await project.save();
    const populatedProject = await Project.findById(projectId).populate(
      "members",
      "name email role"
    );

    res.status(200).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all members of a project
export const getMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId).populate(
      "members",
      "name email role"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
