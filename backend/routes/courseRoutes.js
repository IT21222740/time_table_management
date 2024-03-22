const express = require("express");
const router = express.Router();
const {
  getCourses,
  publishCourse,
  updateCourse,
  deleteCourese,
  getCourse,
} = require("../controllers/courseController");
const authorizeRole = require("../middleware/authorization");
const validateToken = require("../middleware/validateToken");

router
  .route("/")
  .get(validateToken, getCourses)
  .post(validateToken, authorizeRole("admin"), publishCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourese);

module.exports = router;
