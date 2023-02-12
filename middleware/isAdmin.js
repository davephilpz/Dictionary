const User = require("../models/user.model");

//this must be after isLoggedIn middleware in router or userAuthId will not yet have been added to req object.
exports.isAdmin = async (req, res, next) => {
  //find userAuthId
  const user = await User.findById(req.userAuthId);

  //check if user is admin or not
  if (user.role === "admin") {
    next();
  } else {
    return "Admin only";
  }
};
