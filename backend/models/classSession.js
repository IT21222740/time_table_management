const mongoose = require("mongoose");

const classSessionShema = mongoose.Schema(
  {
    batch: {
      type: String,
      require: [true, "Batch is required"],
    },
    faculty: {
      type: mongoose.Schema.ObjectId,
      require: [true, "Faculty is required"],
      ref: "Faculty",
    },
    course: {
      type: mongoose.Schema.ObjectId,
      require: [true, "Courese is required"],
      ref: "Course",
    },
    location: {
      type: mongoose.Schema.ObjectId,
      require: [true, "Location is required"],
      ref: "Resource",
    },
    day: {
      type: String,
      require: [true, "Day is required"],
    },
    startTime: {
      type: String,
      require: [true, "Start Time is required"],
    },
    endTime: {
      type: String,
      require: [true, "End Time is required"],
    },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResourceAvbt" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClassSession", classSessionShema);
