const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.route("/").get(adminController.getAdminControls);

//get word for CRUD
router.route("/edit-word").get(adminController.getEditWord);

//create route
router.route("/add-word").get(adminController.getCreateWord);

//update route
router
  .route("/update-word")
  .get(adminController.getUpdateWord)
  .patch(adminController.postUpdateWord);

//delete route
router
  .route("/delete-word")
  .get(adminController.getDeleteWord)
  .delete(adminController.postDeleteWord);

module.exports = router;
