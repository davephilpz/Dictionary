const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.get("/", wordController.findAllWords);
router.post("/", wordController.createWord);

// router
//   .route("/")
//   .get(wordController.findAllWords)
//   .post(wordController.createWord);

// router
//   .route("/:id")
//   .get(wordController.findWord)
//   .patch(wordController.updateWord)
//   .delete(wordController.deleteWord);

module.exports = router;
