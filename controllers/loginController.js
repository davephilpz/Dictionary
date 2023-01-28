const User = require("../models/user.model");

exports.getLogin = async (req, res, next) => {
  res.render("login", {
    pageTitle: "User Login",
    path: "/login",
  });
};

exports.postLogin = async (req, res, next) => {
  console.log(
    `username ${req.body.username} password ${req.body.password} email ${req.body.email} reference ${req.body.reference}`
  );
  // res.send(
  //   `username ${req.body.username} password ${req.body.password} email ${req.body.email} reference ${req.body.reference}`
  // );
};
