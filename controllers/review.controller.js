const Word = require("../models/word.model");

exports.getReviewWords = async (req, res) => {
  try {
    res.render("review", {
      pageTitle: "Review",
      contentTitle: "Word Review",
      path: "/",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    (err) => {
      res.status(500).json({ message: err.message });
      //500 means server error
      console.log(err);
    };
  }
};

exports.postReviewWords = async (req, res) => {
  const { message } = req.body;

  try {
    console.log("found");
    let searchResults = await Word.aggregate([{ $sample: { size: 10 } }])
      .then((searchResults) => {
        console.log(searchResults);
        console.log(searchResults[0].日本語.日本語単語);
        console.log("Search Results:", searchResults);
        res.render("review-results", {
          pageTitle: "Review",
          contentTitle: "Word Review",
          path: "/",
          searchResults,
          isAuthenticated: req.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
