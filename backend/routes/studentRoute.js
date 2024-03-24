const express = require("express");
const {
  registerStudent,
  enrollCourses,
} = require("../controllers/studentController");
const validateToken = require("../middleware/validateToken");
const authorizeRole = require("../middleware/authorization");

const router = express.Router();

router.post(
  "/register",
  validateToken,
  authorizeRole("admin"),
  registerStudent
);

router.post(
  "/enroll-course",
  validateToken,
  authorizeRole("faculty"),
  enrollCourses
);

module.exports = router;
