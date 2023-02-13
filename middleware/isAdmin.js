const User = require("../models/user.model");

//this must be after isLoggedIn middleware in router or userAuthId will not yet have been added to req object.
exports.isAdmin = async (req, res, next) => {
  //find userAuthId
  const user = await User.findById(req.userAuthId);

  //check if user is admin or not
  if (user.role === "admin") {
    next();
  } else {
    return res.status(401).render("401", {
      pageTitle: "Unauthorized",
      contentTitle: "You are not authorized to view this content",
      message: "Admin only",
      session: req.session, //leaving this '' signs user out, removing it throws ejs error for undefined, req.session persists current session.
    });
  }
};
