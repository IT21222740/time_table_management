const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  resourceName: {
    type: String,
    require: [true, "Location name is required"],
    unique: true,
  },
  resourceType: {
    type: String,
    require: [true, "Resource type is mandatory"],
  },
});

module.exports = locationSchema;
