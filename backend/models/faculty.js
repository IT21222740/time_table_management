const mongoose = require("mongoose");

const facultySchema = mongoose.Schema(
  {
    facultyname: {
      type: String,
      require: [true, "Location name is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Faculty", facultySchema);
