const express = require("express");
const router = express.Router();
const {
  getCourses,
  publishCourse,
  updateCourse,
  deleteCourese,
  getCourse,
} = require("../controllers/courseController");

router.route("/").get(getCourses).post(publishCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourese);

module.exports = router;
