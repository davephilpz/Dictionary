const express = require("express");

const authController = require("../controllers/auth.controller");

const { isLoggedIn } = require("../middleware/isLoggedIn");

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

router.route("/signout").get(authController.getUserSignout);

////////user/admin restricted////////
// TODO if admin will have a special profile, need to import and add isAdmin middleware to this route.
router.route("/profile").get(isLoggedIn, authController.getUserProfile);

module.exports = router;
