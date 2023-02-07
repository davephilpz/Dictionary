const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.route("/").get(wordController.getSearchPage);

router.route("/search/:word").post(wordController.postSearchWord);
//   .get(wordController.getSearchWord);

module.exports = router;
