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
    const user = await User.findById(req.session.userAuthId).populate(
      "myWords.red myWords.orange myWords.yellow"
    );
    console.log("user id", req.session.userAuthId);
    console.log("user info:", user);

    let searchResult = null;
    if (
      user &&
      (user.myWords.red.length > 0 ||
        user.myWords.orange.length > 0 ||
        user.myWords.yellow.length > 0)
    ) {
      const randomReviewWord = Math.random();

      if (randomReviewWord < 0.5 && user.myWords.red.length > 0) {
        searchResult =
          user.myWords.red[Math.floor(Math.random() * user.myWords.red.length)];
      } else if (
        randomReviewWord >= 0.5 &&
        randomReviewWord < 0.8 &&
        user.myWords.orange.length > 0
      ) {
        searchResult =
          user.myWords.orange[
            Math.floor(Math.random() * user.myWords.orange.length)
          ];
      } else if (user.myWords.yellow.length > 0) {
        searchResult =
          user.myWords.yellow[
            Math.floor(Math.random() * user.myWords.yellow.length)
          ];
      }
    }

    searchResult = [searchResult.toObject()];

    console.log("search result after random:", searchResult);

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

      const existingColor = Object.keys(userFound.myWords).find((color) => {
        return userFound.myWords[color].includes(wordFound[0]._id);
      });

      if (existingColor && existingColor !== level) {
        // word already exists in a different color category
        const index = userFound.myWords[existingColor].indexOf(
          wordFound[0]._id
        );
        userFound.myWords[existingColor].splice(index, 1);
      }

      if (!existingColor || existingColor !== level) {
        // word does not exist in current color category, add to it
        userFound.myWords[level].push(wordFound[0]._id);
      }

      await userFound.save();

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
