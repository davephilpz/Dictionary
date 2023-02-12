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
router.route("/edit-word").get(adminController.getEditWord);

//create route
router
  .route("/add-word")
  .get(adminController.getCreateWord)
  .post(adminController.postCreateWord);

//update route
router
  .route("/update-word")
  .get(adminController.getUpdateWord)
  .post(adminController.postUpdateWord);

//delete route
router
  .route("/delete-word")
  .get(adminController.getDeleteWord)
  .post(adminController.postDeleteWord);

module.exports = router;
