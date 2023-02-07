const Word = require("../models/word.model");
const mongoose = require("mongoose");

exports.getSearchPage = async (req, res, next) => {
  try {
    res.render("index", {
      pageTitle: "Dictionary",
      contentTitle: "Word Search",
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

exports.postSearchWord = async (req, res, next) => {
  const searchString = req.params.word;
  // const searchString = req.body.searchString.trim();
  const sanitizedSearchString = searchString.replace(/[＊*]/g, "");
  const query = {};
  let url = `/search/${searchString}`;

  console.log("url params:", searchString);

  try {
    console.log("req.body:", req.body);
    console.log("search string:", searchString);
    console.log("sanitized search string:", sanitizedSearchString);

    if (searchString[0] === "*" || searchString[0] === "＊") {
      // If * is at the beginning, match any characters after the word
      query.searchString = new RegExp(sanitizedSearchString + "$");
    } else if (
      searchString[searchString.length - 1] === "*" ||
      searchString[searchString.length - 1] === "＊"
    ) {
      // If * is at the end, match any characters before the word
      query.searchString = new RegExp("^" + sanitizedSearchString + ".*");
    } else {
      // Otherwise, match exactly
      query.searchString = sanitizedSearchString;
    }
    console.log("query:", query);
    console.log("query.searchString:", query.searchString);

    // Find words matching query
    let searchResults = await Word.find({
      //search kanji, hiragana, katakana, romaji and English and return all results
      $or: [
        { "日本語.日本語単語": query.searchString },
        { "日本語.平仮名": query.searchString },
        { "日本語.片仮名": query.searchString },
        { "日本語.ローマ字": query.searchString },
        { "英語.英単語": query.searchString },
      ],
    });

    // let searchResults = await Word.find({ "日本語.日本語単語": searchString }); //working version without wildcard.
    // let searchResults = await Word.find({
    //   "日本語.日本語単語": {
    //     $regex: new RegExp("^" + searchString + ".*"),
    //     $options: "i",
    //   },
    // }); //wildcard, but not fully working
    // const page = req.
    //     let limit = 5;

    // let searchResults = await Word.find({
    //   "日本語.日本語単語": searchString,
    // });
    // .skip((page - 1) * limit)
    // .limit(limit);

    //query to find in any field
    // let searchResults = await Word.find({
    //   $or: [
    //     { "日本語.日本語単語": searchString },
    //     { "日本語.平仮名": searchString },
    //     { "日本語.片仮名": searchString },
    //     { "日本語.ローマ字": searchString },
    //     { "英語.英単語": searchString },
    //   ],
    // });
    //this works, but needs wildcard feature added.

    // limit search results to 5
    searchResults = searchResults.slice(0, 9999);

    // res.redirect(url, {
    //   searchResults,
    //   searchString,
    //   pageTitle: `${searchString}`,
    //   contentTitle: "Word Search",
    //   isAuthenticated: req.isLoggedIn,
    // });
    res.render(`search`, {
      searchResults,
      searchString,
      pageTitle: `${searchString}`,
      contentTitle: "Word Search",
      isAuthenticated: req.isLoggedIn,
    });
    console.log("Search Results:", searchResults);
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

// exports.getSearchWord = async (req, res) => {
//   let searchString = req.params.word;

//   res.render("search", {
//     pageTitle: `${searchString}`,
//     contentTitle: "Word Search",
//     isAuthenticated: req.isLoggedIn,
//   });
// };
