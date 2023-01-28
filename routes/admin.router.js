const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.route("/admin").get(wordController.getAdminControls);

router
  .route("/admin/add-word")
  .get(wordController.getCreateWord)
  .post(wordController.postCreateWord);

router
  .route("/admin/edit-word")
  .get(wordController.getUpdateWord)
  .patch(wordController.postUpdateWord);

router
  .route("/admin/delete-word")
  .get(wordController.getDeleteWord)
  .delete(wordController.postDeleteWord);

module.exports = router;
