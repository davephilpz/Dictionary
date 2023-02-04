const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.route("/").get(adminController.getAdminControls);

router
  .route("/add-word")
  .get(adminController.getCreateWord)
  .post(adminController.postCreateWord);

router
  .route("/edit-word")
  .get(adminController.getUpdateWord)
  .patch(adminController.postUpdateWord);

router
  .route("/delete-word")
  .get(adminController.getDeleteWord)
  .delete(adminController.postDeleteWord);

module.exports = router;
