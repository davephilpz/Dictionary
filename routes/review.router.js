const express = require("express");
const reviewController = require("../controllers/review.controller");

const router = express.Router();

////////user/admin restricted////////
router
  .route("/review")
  .get(reviewController.getReviewWords)
  .post(reviewController.postReviewWords);

module.exports = router;
