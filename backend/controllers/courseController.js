const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
//@desc Get all course
//@route GET /api/courses
//@access private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
});

//@desc Get a course
//@route Get /api/courses/:id
//@access private
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ code: req.params.id });
  if (!course) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(200).json(course);
});

//@desc Post a course
//@route Post /api/courses
//@access private
const publishCourse = asyncHandler(async (req, res) => {
  console.log("The request body", req.body);
  const { name, code, credits, facultyUserName } = req.body;
  if (!name || !code || !credits || !facultyUserName) {
    res.status(400);
    throw new Error("All fiels are mandatory");
  }

  const faculty = await User.findOne({ username: facultyUserName });
  console.log(faculty);
  if (!faculty) {
    res.status(400);
    throw new Error("Wrong Faculty");
  }
  const course = await Course.create({
    faculty_id: faculty._id,
    name,
    code,
    credits,
  });

  res.status(201).json(course);
});

//@desc Update a course
//@route Put /api/courses/:id
//@access private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ code: req.params.id });
  if (!course) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateCourse);
});

//@desc Delete a course
//@route Delete /api/course/:id
//@access private
const deleteCourese = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ code: req.params.id });
  if (!course) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json(course);
});

module.exports = {
  getCourses,
  getCourse,
  publishCourse,
  updateCourse,
  deleteCourese,
};
