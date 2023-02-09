const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.route("/").get(adminController.getAdminControls);

//create routes
router.route("/add-word").get(adminController.getCreateWord);
// .post(adminController.postCreateWord);

//edit routes
router.route("/edit-word").get(adminController.getEditWord);

//delete routes
router
  .route("/delete-word")
  .get(adminController.getDeleteWord)
  .delete(adminController.postDeleteWord);

module.exports = router;
