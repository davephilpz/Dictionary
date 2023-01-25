const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

// router.get("/", wordController.findAllWords);
// router.get("/", wordController.findOneWord);
// router.post("/", wordController.createWord);

router
  .route("/")
  .get(wordController.findAllWords)
  .post(wordController.createWord);

router
  .route("/words/:search")
  .get(wordController.findOneWord)
  .patch(wordController.updateWord)
  .delete(wordController.deleteWord);

module.exports = router;
