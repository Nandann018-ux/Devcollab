
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = {
      id: Date.now(),
      title,
      description,
      admin: "Admin User",
    };

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    res.json([
      { id: 1, title: "DevCollab", description: "Collaboration platform" },
    ]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = {
      projectId: req.params.id,
      adminName: "Nandan",
      role: "Project Admin",
    };

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
