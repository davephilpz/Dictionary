const express = require("express");

const loginController = require("../controllers/login.controller");

const router = express();

router
  .route("/login")
  .get(loginController.getLogin)
  .post(loginController.postLogin);

module.exports = router;
