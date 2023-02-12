const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getRegisterUser = async (req, res) => {
  res.render("signup", {
    pageTitle: "User Sign Up",
    contentTitle: "User Sign Up",
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, salt);

  //create user
  const user = await User.create({
    name,
    email,
    role,
    password: hashedPassword,
    passwordConfirm: hashedPasswordConfirm,
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

  const userFound = await User.findOne({ email: email }).exec();
  console.log(userFound);
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      message: "Success",
    });
  } else {
    res.json({
      message: "Invalid login credentials",
    });
  }

  req.isLoggedIn = true;
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
  // res.redirect("/");
  console.log(req.isLoggedIn);
  console.log(req.isAuthenticated);
};
