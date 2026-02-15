import Project from "../models/Project.js";

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
    }).populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  res.json({ message: "Welcome Admin 🚀", user: req.user });
};
