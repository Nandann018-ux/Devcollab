import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User profile accessed",
    user: req.user,
  });
});

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin 🚀",
    });
  }
);

router.get(
  "/developer",
  protect,
  authorizeRoles("developer", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome Developer 👨‍💻",
    });
  }
);

export default router;
