const User = require("../models/user.model");

exports.getLogin = async (req, res, next) => {
  res.render("login", {
    pageTitle: "User Login",
    contentTitle: "User Login",
    path: "/login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = async (req, res, next) => {
  console.log(
    `username ${req.body.username} password ${req.body.password} email ${req.body.email} reference ${req.body.reference}`
  );
  req.isLoggedIn = true;
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
  res.redirect("/");
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
};
