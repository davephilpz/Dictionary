const Word = require("../models/word.model");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

exports.getReviewWords = catchAsyncErrorHandler(async (req, res, next) => {
  // const { message } = req.body;
  // const page = req.query.page || 1;
  // const pages = 10;
  // const wordsPerPage = 1;
  // let searchResults = [];
  // searchResults = await Word.aggregate([{ $sample: { size: 10 } }])
  //   .skip(page * (wordsPerPage - 1))
  //   .limit(wordsPerPage)
  //   .then((searchResults) => {
  //     // console.log(searchResults);
  //     // console.log(searchResults[0].日本語.日本語単語);
  //     // console.log("Search Results:", searchResults);
  //     res.render("review-results", {
  //       pageTitle: "Review",
  //       contentTitle: "Word Review",
  //       searchResults,
  //       pages,
  //       session: req.session,
  //     });
  //   });
  res.render("review", {
    pageTitle: "Review",
    contentTitle: "Word Review",
    path: "/",
    // searchResults,
    session: req.session,
  });
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
