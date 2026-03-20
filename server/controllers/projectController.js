import Project from "../models/Project.js";

// POST /api/projects — Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, techStack, deadline } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    // The owner is set from req.user (injected by the protect middleware)
    // so users can only own their own projects
    const project = await Project.create({
      name,
      description,
      techStack: techStack || [],
      deadline: deadline || null,
      owner: req.user._id,
      members: [req.user._id], // Creator is automatically a member
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/projects — Get all projects where user is owner or member
export const getProjects = async (req, res) => {
  try {
    // $or lets us return both projects owned by and shared with the user
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    })
      .populate("owner", "name avatar role") // Only select non-sensitive fields
      .populate("members", "name avatar role")
      .sort({ updatedAt: -1 }); // Most recently updated first

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/projects/:id — Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name avatar role")
      .populate("members", "name avatar role");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization check — only owners or members can view the project
    const isMember =
      project.owner._id.equals(req.user._id) ||
      project.members.some((m) => m._id.equals(req.user._id));

    if (!isMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Get project by ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/projects/:id — Update a project (owner only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only the owner can update project details
    if (!project.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Only the project owner can update it" });
    }

    const { name, description, status, techStack, deadline, progress } =
      req.body;

    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;
    if (techStack) project.techStack = techStack;
    if (deadline !== undefined) project.deadline = deadline;
    if (progress !== undefined) project.progress = progress;

    const updated = await project.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/projects/:id — Delete a project (owner only)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Only the project owner can delete it" });
    }

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
