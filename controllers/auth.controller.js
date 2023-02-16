const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/generateToken");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

exports.getRegisterUser = catchAsyncErrorHandler(async (req, res, next) => {
  res.render("signup", {
    pageTitle: "User Sign Up",
    contentTitle: "User Sign Up",
    session: req.session,
  });
});

exports.postRegisterUser = catchAsyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log("user reg req.body:", req.body);

  const userExists = await User.findOne({ email });

  //check to see if user already exists or not
  if (userExists) {
    // res.json({
    //   message: "User already exists",
    // });
    return next(new AppError("User already exists", 400));
  }

  //double check password for strength requirements
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  if (
    password.length < 10 ||
    confirmPassword.length < 10 ||
    password !== confirmPassword
  ) {
    res.status(400).json({
      message: "Password does not meet minimum length requirements.",
    });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password is not strong enough." });
  } else if (password !== confirmPassword) {
    res.status(400).json({
      message: "Passwords do not match.",
    });
  } else {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedconfirmPassword = await bcrypt.hash(confirmPassword, salt);

    //create user
    const user = await User.create({
      name,
      email,
      role: "user", //role statically set as user to prevent injections.
      password: hashedPassword,
      passwordConfirm: hashedconfirmPassword,
    }).then(
      res.status(201).json({
        message: "User successfully created",
      })
    );
  }
});

exports.getLogin = catchAsyncErrorHandler(async (req, res, next) => {
  res.render("signin", {
    pageTitle: "User Sign In",
    contentTitle: "User Sign In",
    session: req.session,
  });
});

exports.postLogin = catchAsyncErrorHandler(async (req, res, next) => {
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
    return next(new AppError("Invalid login credentials", 401));
  }
});

exports.getUserProfile = catchAsyncErrorHandler(async (req, res, next) => {
  res.render("user-profile", {
    pageTitle: "User Profile",
    contentTitle: "User Profile",
    session: req.session,
  });
});

exports.getUserSignout = catchAsyncErrorHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.clearCookie("jwt");
      res.redirect("/");
    }
  });
});
