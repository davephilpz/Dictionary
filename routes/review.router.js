const express = require("express");
const reviewController = require("../controllers/review.controller");

const { isLoggedIn } = require("../middleware/isLoggedIn");

const router = express.Router();

////////user/admin restricted////////
// TODO if admin will have special functionality, need to import and add isAdmin middleware to this route.
router
  .route("/review")
  .get(isLoggedIn, reviewController.getReviewWords)
  .post(isLoggedIn, reviewController.postReviewWords);

module.exports = router;
