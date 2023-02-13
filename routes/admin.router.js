const express = require("express");

const adminController = require("../controllers/admin.controller");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

////////admin restricted////////
//admin controls
router.route("/").get(isLoggedIn, isAdmin, adminController.getAdminControls);

// TODO consolidate this into admin home route
//get word for CRUD
router
  .route("/edit-word")
  .get(isLoggedIn, isAdmin, adminController.getEditWord);

//create route
router
  .route("/add-word")
  .get(isLoggedIn, isAdmin, adminController.getCreateWord)
  .post(isLoggedIn, isAdmin, adminController.postCreateWord);

//update route
router
  .route("/update-word")
  .get(isLoggedIn, isAdmin, adminController.getUpdateWord)
  .post(isLoggedIn, isAdmin, adminController.postUpdateWord);

//delete route
router
  .route("/delete-word")
  .get(isLoggedIn, isAdmin, adminController.getDeleteWord)
  .post(isLoggedIn, isAdmin, adminController.postDeleteWord);

module.exports = router;
