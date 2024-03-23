const express = require("express");
const {
  getCourses,
  publishCourse,
  updateCourse,
  deleteCourese,
  getCourse,
} = require("../controllers/courseController");
const authorizeRole = require("../middleware/authorization");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getCourses).post(authorizeRole("admin"), publishCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(authorizeRole("admin"), updateCourse)
  .delete(authorizeRole("admin"), deleteCourese);

module.exports = router;
