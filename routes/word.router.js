const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.route("/").get(wordController.getSearchWord);

router.route("/search").post(wordController.postSearchWord);

module.exports = router;
