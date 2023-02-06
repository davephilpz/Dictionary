const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.route("/").get(wordController.getSearchWord);

router.route("/search/:word").get(wordController.postSearchWord);

module.exports = router;
