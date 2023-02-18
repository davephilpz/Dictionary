const Word = require("../models/word.model");
const User = require("../models/user.model");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

exports.getReviewWords = async (req, res, next) => {
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
  } else if (req.query.type === "reviewWords") {
    searchResult = await Word.aggregate([{ $sample: { size: 1 } }]);

    console.log("search results:", searchResult);

    res.render("review-results", {
      pageTitle: "Current Review Words",
      contentTitle: "Current Collection Word Review",
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
};

exports.postReviewWords = async (req, res, next) => {
  const word = req.query.word;
  const level = req.query.level;
  const type = req.query.type;

  console.log("word:", word);
  console.log("level:", level);
  console.log("type:", type);

  if (!word) {
    console.log("stop 0");
    return "no word";
  } else {
    const wordFound = await Word.find({ "日本語.日本語単語": word });

    if (!wordFound) {
      console.log("stop 1");
      return "word not found";
    } else {
      console.log("session user id:", req.session.userAuthId);
      const userFound = await User.findOne({ _id: req.session.userAuthId });

      if (!userFound) {
        console.log("stop 2");
        return "user not found";
      }

      const wordsArray = userFound.myWords[level];
      const wordExists = wordsArray.some((wordObject) => {
        return wordObject._id.toString() === wordFound[0]._id.toString();
      });

      if (!wordExists) {
        userFound.myWords[level].push(wordFound[0]._id);
        await userFound.save();
      }

      searchResult = await Word.aggregate([{ $sample: { size: 1 } }]);

      // console.log("word found:", wordFound);

      res.render("review-results", {
        pageTitle: "New Review Words",
        contentTitle: "New Word Review",
        searchResult,
        reviewType: req.query.type,
        session: req.session,
      });
    }
  }
};
