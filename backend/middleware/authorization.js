const asyncHandler = require("express-async-handler");

const authorizeRole = (role) =>
  asyncHandler((req, res, next) => {
    console.log("Required role is ", role);
    console.log("user role is ", req.user);
    if (req.user && req.user.role == role) {
      next();
    } else {
      res.status(403);
      throw new Error("User is not authorized to access this resource");
    }
  });

module.exports = authorizeRole;
