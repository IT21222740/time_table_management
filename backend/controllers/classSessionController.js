const asyncHandler = require("express-async-handler");
const Resource = require("../models/resource");
const Faculty = require("../models/faculty");
const Course = require("../models/courseModel");
const ClassSession = require("../models/classSession");
const calculateSlotsDuringTime = require("../util/SlotsNumber");
const ResourceAvbt = require("../models/locationAvailabiltyModel");
//@desc Post a Timetable for student
//@route post /api/class-session/
//@access private
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
//@desc post a Timetable for student
//@route post /api/class-session/check
//@access private
const checkAvailabilty = asyncHandler(async (req, res) => {
  const { code, day, startTime, endTime } = req.body;
  console.log(req.body);

  if (!code || !day || !startTime || !endTime) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const resource = await Resource.findOne({ resourceCode: code });

  if (!resource) {
    res.status(400);
    throw new Error("Pleas add valid Resource");
  }
  const slots = calculateSlotsDuringTime(startTime, endTime, 30);
  console.log("avilabilty" + slots);
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
    res.status(200).json({
      message: "Resource is avilable",
      resource: code,
      startTime: startTime,
      endTime: endTime,
    });
  }
});

//@desc Get a Timetable for student
//@route Get /api/class-session/:id
//@access private
const getTimeTable = asyncHandler(async (req, res) => {
  const classSession = await ClassSession.find({ batch: req.params.id });
  if (!classSession) {
    res.status(200).json({ message: "No timetables for this batch" });
  }
  res.status(200).json(classSession);
});

const updateClassSession = asyncHandler(async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.id);
    if (!classSession) {
      return res.status(404).json({ error: "Class Session not Found" });
    }

    const {
      batch,
      courseCode,
      day,
      startTime,
      endTime,
      facultyName,
      location,
    } = req.body;

    const course = await Course.findOne({ code: courseCode });
    if (!course) {
      return res.status(400).json({ error: "Invalid courseCode" });
    }

    const faculty = await Faculty.findOne({ facultyname: facultyName });
    if (!faculty) {
      return res.status(400).json({ error: "Invalid facultyName" });
    }

    const resource = await Resource.findOne({ resourceCode: location });
    if (!resource) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const newSlots = calculateSlotsDuringTime(startTime, endTime, 30);

    for (const slot of newSlots) {
      const checkAvailability = await ResourceAvbt.findOne({
        resourceCode: resource._id,
        day: day,
        slot: slot,
      });

      if (checkAvailability) {
        return res
          .status(400)
          .json({ error: "Slot already booked. Please try another time slot" });
      }
    }

    // Update classSession
    classSession.batch = batch;
    classSession.course = course._id;
    classSession.day = day;
    classSession.startTime = startTime;
    classSession.endTime = endTime;
    classSession.faculty = faculty._id;
    classSession.location = location._id;

    // Remove previous slots
    await ResourceAvbt.deleteMany({ _id: { $in: classSession.slots } });
    const slotIds = [];

    for (const slot of newSlots) {
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
    classSession.slots = slotIds;
    const updatedSession = await classSession.save();
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update class session",
      error: error.message,
    });
  }
});
//@desc Delete Class Session
//@route DELETE /api/classSessions/:id
//@access public
const deleteClassSession = asyncHandler(async (req, res) => {
  const classSession = await ClassSession.findById(req.params.id);
  if (!classSession) {
    res.status(404);
    throw new Error("Class Session not found");
  }
  await ResourceAvbt.deleteMany({ _id: { $in: classSession.slots } });
  await ClassSession.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Class Session Deleted", classSession });
});

module.exports = {
  postClassSession,
  checkAvailabilty,
  getTimeTable,
  updateClassSession,
  deleteClassSession,
};
