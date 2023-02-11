const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

//homepage route
router.route("/").get(wordController.getSearchPage);
router.route("/").post(wordController.postLiveSearch);

//read route
router.route("/search/:word").post(wordController.postSearchWord);

module.exports = router;
