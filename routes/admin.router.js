const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.route("/admin").get(adminController.getAdminControls);

router
  .route("/admin/add-word")
  .get(adminController.getCreateWord)
  .post(adminController.postCreateWord);

router
  .route("/admin/edit-word")
  .get(adminController.getUpdateWord)
  .patch(adminController.postUpdateWord);

router
  .route("/admin/delete-word")
  .get(adminController.getDeleteWord)
  .delete(adminController.postDeleteWord);

module.exports = router;
