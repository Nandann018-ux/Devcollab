import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, project, assignedTo, priority, dueDate } =
    req.body;

  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  res.status(201).json(task);
};

export const getProjectTasks = async (req, res) => {
  const tasks = await Task.find({
    project: req.params.projectId,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name");

  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(task);
};
