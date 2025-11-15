const express = require("express");

const aiController = require("../controllers/ai.controller");

const router = express.Router();

//create route
router
  .route("/add-word")
  .get(aiController.getCreateWord)
  .post(aiController.postCreateWord);

module.exports = router;
