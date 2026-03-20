import api from "./api.js";

// Auth service keeps all auth-related API calls in one place.
// Components import these functions instead of writing fetch/axios inline,
// which makes unit testing and API changes much easier.

// POST /api/auth/register
export const register = async (name, email, password, role = "developer") => {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return data; // Returns { _id, name, email, role, avatar, token }
};

// POST /api/auth/login
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // Returns { _id, name, email, role, avatar, bio, token }
};

// GET /api/auth/me — fetch the current logged-in user's profile
// The token is attached automatically by the Axios interceptor in api.js
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

// PUT /api/auth/profile — update profile fields
export const updateProfile = async (updates) => {
  const { data } = await api.put("/auth/profile", updates);
  return data;
};
