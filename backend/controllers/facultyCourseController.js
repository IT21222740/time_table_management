const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

//@desc Get all couses related to faculty
//@route Get /api/FacultyCourses:id
//@acess private
const getFacultyCourses = asyncHandler(async (req, res) => {
  const faculty = await User.findOne({ username: req.params.id });
  const courses = await Course.find({ faculty_id: faculty._id });
  console.log("Requested faculty", faculty);
  console.log(courses);
  res.status(200).json(courses);
});

module.exports = { getFacultyCourses };
