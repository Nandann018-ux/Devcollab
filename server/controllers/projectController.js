import {Project} from "../models/Project.js";
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

export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { memberId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId))
      return res.status(400).json({ message: "Invalid projectId" });
    if (!mongoose.Types.ObjectId.isValid(memberId))
      return res.status(400).json({ message: "Invalid memberId" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.members.includes(memberId))
      return res.status(400).json({ message: "User already a member" });

    project.members.push(memberId);
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId))
      return res.status(400).json({ message: "Invalid projectId" });

    const project = await Project.findById(projectId).populate("members", "name email role");
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(memberId))
      return res.status(400).json({ message: "Invalid ID" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.members.includes(memberId))
      return res.status(400).json({ message: "User is not a member" });

    project.members = project.members.filter((id) => id.toString() !== memberId);
    await project.save();

    res.json({ message: "Member removed", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId))
      return res.status(400).json({ message: "Invalid projectId" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Only owner can update project" });

    if (name) project.name = name;
    if (description) project.description = description;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  res.json({ message: "Welcome Admin 🚀", user: req.user });
};
