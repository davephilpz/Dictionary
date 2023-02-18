const Word = require("../models/word.model");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

exports.getReviewWords = catchAsyncErrorHandler(async (req, res, next) => {
  // const { newWords, reviewWords } = req.query.type || {};

  console.log("get new word query:", req.query.type);

  if (req.query.type === "newWords") {
    searchResult = await Word.aggregate([{ $sample: { size: 1 } }]);

    console.log("search results:", searchResult);

    res.render("review-results", {
      pageTitle: "New Review Words",
      contentTitle: "New Word Review",
      searchResult,
      reviewType: req.query.type,
      session: req.session,
    });
  } else {
    res.render("review", {
      pageTitle: "Review",
      contentTitle: "Word Review",
      session: req.session,
    });
  }
});

exports.postReviewWords = catchAsyncErrorHandler(async (req, res, next) => {
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } catch (err) {
  //   (err) => {
  //     res.status(400).json({ message: err.message });
  //     //400 means user error
  //     console.log(err);
  //   };
  // }
});
