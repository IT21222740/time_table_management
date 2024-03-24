const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
  resourceCode: {
    type: String,
    require: [true, "Resource name is required"],
    unique: true,
  },
  resourceType: {
    type: String,
    require: [true, "Resource type is mandatory"],
    enum: ["classRoom", "Lab", "projector", "printer"],
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
