const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/generateToken");
const { getTokenFromHeader } = require("../util/getTokenFromHeader");
const { verifyToken } = require("../util/verifyToken");

exports.getRegisterUser = async (req, res) => {
  res.render("signup", {
    pageTitle: "User Sign Up",
    contentTitle: "User Sign Up",
    session: req.session,
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
    session: req.session,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email: email }).exec();
  console.log(userFound);
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.cookie("jwt", generateToken(userFound?._id));

    //save user ID to session to persist through EJS template reloads. Removing this will remove the protected nav when going to unprotected route.
    const userAuthId = userFound._id;
    const userType = userFound.role;
    req.session.userAuthId = userAuthId;
    req.session.isAdmin = userType;

    console.log("login isadmin:", req.session.isAdmin);

    res.render("index", {
      pageTitle: "Dictionary",
      contentTitle: "Word Search",
      userFound,
      session: req.session,
    });

    console.log("login req.session:", req.session);
  } else {
    res.json({
      message: "Invalid login credentials",
    });
  }
};

exports.getUserProfile = async (req, res) => {
  res.render("user-profile", {
    pageTitle: "User Profile",
    contentTitle: "User Profile",
    session: req.session,
  });
};

exports.getUserSignout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.clearCookie("jwt");
      res.redirect("/");
    }
  });
};
