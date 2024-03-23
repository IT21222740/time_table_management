const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Faculty = require("../models/faculty");

//@desc Get all couses related to faculty
//@route Get /api/Faculty:id
//@acess private
const getFacultyCourses = asyncHandler(async (req, res) => {
  const faculty = await User.findOne({ username: req.params.id });
  const courses = await Course.find({ faculty_id: faculty._id });
  console.log("Requested faculty", faculty);
  console.log(courses);
  res.status(200).json(courses);
});

//@desc Post faculties
//route Post /api/faculty
//@acess private
const postFaculty = asyncHandler(async (req, res) => {
  const { facultyname } = req.body;
  console.log(facultyname);
  if (!facultyname) {
    res.status(400);
    throw new Error("faculty name is mandatory");
  }
  const faculty = await Faculty.create({
    facultyname,
  });
  if (faculty) {
    res.status(201).json({ _id: faculty._id, name: faculty.facultyname });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

module.exports = { getFacultyCourses, postFaculty };
