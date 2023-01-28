const User = require("../models/user.model");

exports.getLogin = async (req, res, next) => {
  res.render("login", {
    pageTitle: "User Login",
    path: "/login",
  });
};
