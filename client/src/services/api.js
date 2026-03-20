import axios from "axios";

// Single Axios instance shared across all services.
// Centralising baseURL here means we only need to change one line
// if the backend URL changes (e.g., staging vs. production).
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — automatically attaches the JWT token to every request.
// Instead of passing the token manually in each service call, we add it once here.
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handles 401 globally.
// If the token expires mid-session, the user is redirected to login automatically.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      // Redirect to login without crashing — simple and interview-explainable
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
