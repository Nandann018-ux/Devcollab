import api from "./api.js";

// GET /api/messages/inbox
export const getInbox = async () => {
  const { data } = await api.get("/messages/inbox");
  return data;
};

// GET /api/messages/conversation/:userId — thread with one user
export const getConversation = async (userId) => {
  const { data } = await api.get(`/messages/conversation/${userId}`);
  return data;
};

// POST /api/messages — send a new message
export const sendMessage = async (receiverId, content) => {
  const { data } = await api.post("/messages", { receiverId, content });
  return data;
};

// PUT /api/messages/:id/read
export const markAsRead = async (messageId) => {
  const { data } = await api.put(`/messages/${messageId}/read`);
  return data;
};
