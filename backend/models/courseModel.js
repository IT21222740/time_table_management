const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add the Faculty Id"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the course name"],
    },
    code: {
      type: String,
      required: [true, "Please add the course code"],
      unique: [true, "Module Code Already in the Database"],
    },
    credits: {
      type: String,
      required: [true, "Please add the course credits"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
