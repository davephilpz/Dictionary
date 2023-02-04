const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express();

router
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

module.exports = router;
