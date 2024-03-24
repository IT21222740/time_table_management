const asyncHandler = require("express-async-handler");
const Resource = require("../models/resource");
//@desc Post Resouces
//route Post /api/faculty
//@acess private
const postResources = asyncHandler(async (req, res) => {
  const { resourceCode, resourceType } = req.body;
  console.log(req.body);

  const resource = await Resource.create({
    resourceCode,
    resourceType,
  });
  if (resource) {
    res.status(201).json({
      _id: resource._id,
      name: resource.resourceCode,
      type: resource.resourceType,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

module.exports = { postResources };
