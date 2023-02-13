const express = require("express");

const adminController = require("../controllers/admin.controller");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

////////admin restricted////////
//admin controls
router.route("/").get(isLoggedIn, adminController.getAdminControls);

// TODO consolidate this into admin home route
//get word for CRUD
router.route("/edit-word").get(isLoggedIn, adminController.getEditWord);

//create route
router
  .route("/add-word")
  .get(isLoggedIn, adminController.getCreateWord)
  .post(isLoggedIn, adminController.postCreateWord);

//update route
router
  .route("/update-word")
  .get(isLoggedIn, adminController.getUpdateWord)
  .post(isLoggedIn, adminController.postUpdateWord);

//delete route
router
  .route("/delete-word")
  .get(isLoggedIn, adminController.getDeleteWord)
  .post(isLoggedIn, adminController.postDeleteWord);

module.exports = router;
