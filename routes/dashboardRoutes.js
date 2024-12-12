const express = require("express");
const {
  studentDashboard,
  tutorDashboard,
} = require("../controllers/dashboardController");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate JWT
router.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Role-based routes
router.get("/student", studentDashboard);
router.get("/tutor", tutorDashboard);

module.exports = router;
