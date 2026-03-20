import jwt from "jsonwebtoken";
import User from "../models/User.js";

// protect middleware — gates any route behind a valid JWT.
// Usage: router.get("/me", protect, getMe)
// The client sends the token in the Authorization header as: "Bearer <token>"
export const protect = async (req, res, next) => {
  let token;

  // Check that Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token string after "Bearer "
      token = req.headers.authorization.split(" ")[1];

      // jwt.verify throws if the token is expired or tampered with
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

      // Attach the user (without password hash) to req so downstream
      // controllers can use req.user without an extra DB roundtrip
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Named export so routes can import: { protect }
export default protect;
