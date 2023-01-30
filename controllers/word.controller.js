const Word = require("../models/word.model");

exports.getSearchWord = async (req, res, next) => {
  try {
    // const words = await Word.find();
    res.render("index", {
      // words,
      pageTitle: "Dictionary",
      contentTitle: "Word Search",
      path: "/",
    });
    // console.log(words);
  } catch (err) {
    (err) => {
      res.status(500).json({ message: err.message });
      //500 means server error
      console.log(err);
    };
  }
};

// exports.getSearchWord = async (req, res) => {
//   try {
//     // const word = await Word.findOne({ word: req.params.search });
//     // console.log(word);
//     // if (word === null) {
//     //   console.log("Word not found.");
//     // } else {
//     // console.log(word);
//     res.render("index", {
//       // word,
//       pageTitle: "Search Results",
//       path: "/search:word",
//     });
//     // }
//   } catch (err) {
//     (err) => {
//       res.status(400).json({ message: err.message });
//       //400 means user error
//       console.log(err);
//     };
//   }
// };

exports.postSearchWord = async (req, res, next) => {
  try {
    let searchString = req.body.searchString.trim();
    console.log(searchString);
    let searchResults = await Word.find({
      word: { $regex: new RegExp("^" + searchString + ".*", "i") },
    }).exec();

    //limit search results to 5
    searchResults = searchResults.slice(0, 5);

    res.render("search", {
      searchResults,
      searchString,
      pageTitle: `search: ${searchString}`,
      contentTitle: "Word Search",
      path: `/search`,
    });
    console.log(searchResults);
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};
