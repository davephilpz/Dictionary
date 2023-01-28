const express = require("express");

const loginController = require("../controllers/loginController");

const router = express();

router.route("/login").get(loginController.getLogin);

module.exports = router;
