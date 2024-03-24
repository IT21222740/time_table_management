const asyncHandler = require("express-async-handler");
const Resource = require("../models/resource");
const Faculty = require("../models/faculty");
const Course = require("../models/courseModel");
const ClassSession = require("../models/classSession");
const calculateSlotsDuringTime = require("../util/SlotsNumber");
const ResourceAvbt = require("../models/locationAvailabiltyModel");

const postClassSession = asyncHandler(async (req, res) => {
  const { batch, facultyName, courseCode, location, day, startTime, endTime } =
    req.body;
  console.log(req.body);
  if (
    !batch ||
    !facultyName ||
    !courseCode ||
    !location ||
    !day ||
    !startTime ||
    !endTime
  ) {
    res.status(400);
    throw new Error("All fiels are mandatory");
  }
  const faculty = await Faculty.findOne({ facultyname: facultyName });
  console.log(faculty);
  const resource = await Resource.findOne({ resourceCode: location });
  const course = await Course.findOne({ code: courseCode });

  if (!faculty || !resource || !course) {
    res.status(400);
    if (!faculty) {
      throw new Error("You entered Faculty name is wrong");
    }
    if (!resource) {
      throw new Error("You entered Resource Code is wrong ");
    }
    if (!course) {
      throw new Error("You entered Course code is wrong");
    }
  }
  if (course.faculty_id.toString() != faculty._id.toString()) {
    console.log(course.faculty_id + " " + faculty._id);
    res.status(400);
    throw new Error("You entered Courses code is not relavant to faculty");
  }
  console.log(startTime);
  const slots = calculateSlotsDuringTime(startTime, endTime, 30);

  for (const slot of slots) {
    const checkAvailabilty = await ResourceAvbt.findOne({
      resourceCode: resource._id,
      day: day,
      slot: slot,
    });

    if (checkAvailabilty) {
      res.status(400);
      throw new Error("Already booked. please try another time slot");
    }
  }
  const slotIds = [];
  console.log(slots);
  for (const slot of slots) {
    console.log(day);
    try {
      const booking = await ResourceAvbt.create({
        resourceCode: resource._id,
        day: day,
        slot: slot,
      });
      console.log(booking);
      if (booking) {
        slotIds.push(booking._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(slotIds);
  const classSession = await ClassSession.create({
    batch,
    faculty: faculty._id,
    course: course._id,
    location: resource._id,
    day,
    startTime,
    endTime,
    slots: slotIds,
  });
  if (classSession) {
    res.status(201).json({
      _id: classSession._id,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

module.exports = { postClassSession };
