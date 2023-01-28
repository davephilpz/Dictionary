const express = require("express");

const wordController = require("../controllers/word.controller");

const router = express.Router();

router.route("/").get(wordController.getSearchWord);
// .post(wordController.postSearchWord);

router.route("/search").post(wordController.postSearchWord);

module.exports = router;
