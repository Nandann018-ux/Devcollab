import api from "./api.js";

// All project API calls go through this service.
// Using a service layer keeps components clean — they call functions,
// not raw API strings. Makes mocking in tests trivial too.

// GET /api/projects
export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

// POST /api/projects
export const createProject = async (projectData) => {
  const { data } = await api.post("/projects", projectData);
  return data;
};

// PUT /api/projects/:id
export const updateProject = async (id, updates) => {
  const { data } = await api.put(`/projects/${id}`, updates);
  return data;
};

// DELETE /api/projects/:id
export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};
