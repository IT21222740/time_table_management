const asyncHandler = require("express-async-handler");

const authorizeRole = (...roles) =>
  asyncHandler((req, res, next) => {
    console.log("Required role is ", roles);
    console.log("user role is ", req.user);
    if (!roles.includes(req.user.account_type)) {
      next();
      console.log(roles);
    } else {
      res.status(403);
      throw new Error("User is not authorized to access this resource");
    }
  });

module.exports = authorizeRole;
