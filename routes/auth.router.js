const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express();

////////public access////////
router
  .route("/signup")
  .get(authController.getRegisterUser)
  .post(authController.postRegisterUser);

router
  .route("/signin")
  .get(authController.getLogin)
  .post(authController.postLogin);

module.exports = router;
