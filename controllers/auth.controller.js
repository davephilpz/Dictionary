const User = require("../models/user.model");

exports.getRegisterUser = async (req, res) => {
  res.render("login", {
    pageTitle: "User Signin",
    contentTitle: "User Signin",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postRegisterUser = async (req, res) => {
  const { name, email, role, password, passwordConfirm } = req.body;

  const userExists = await User.findOne({ email });

  //check to see if user already exists or not
  if (userExists) {
    res.json({
      message: "User already exists",
    });
  }
  //hash password

  //create user
  const user = await User.create({
    name,
    email,
    role,
    password,
    passwordConfirm,
  }).then(
    res.status(201).json({
      message: "User successfully created",
    })
  );
};

exports.getLogin = async (req, res, next) => {
  res.render("signin", {
    pageTitle: "User Sign In",
    contentTitle: "User Sign In",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await User.find({ email: email });
  // console.log(
  //   `username ${req.body.username} password ${req.body.password} email ${req.body.email} reference ${req.body.reference}`
  // );
  req.isLoggedIn = true;
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
  res.redirect("/");
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
};
