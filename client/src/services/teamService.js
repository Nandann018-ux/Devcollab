import api from "./api.js";

// GET /api/teams
export const getTeams = async () => {
  const { data } = await api.get("/teams");
  return data;
};

// POST /api/teams
export const createTeam = async (teamData) => {
  const { data } = await api.post("/teams", teamData);
  return data;
};

// POST /api/teams/:id/members — add a user to the team
export const addMember = async (teamId, userId) => {
  const { data } = await api.post(`/teams/${teamId}/members`, { userId });
  return data;
};

// DELETE /api/teams/:id/members/:userId
export const removeMember = async (teamId, userId) => {
  const { data } = await api.delete(`/teams/${teamId}/members/${userId}`);
  return data;
};
