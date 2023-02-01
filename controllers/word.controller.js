const Word = require("../models/word.model");

exports.getSearchWord = async (req, res, next) => {
  try {
    res.render("index", {
      pageTitle: "Dictionary",
      contentTitle: "Word Search",
      path: "/",
      // output: req.params.id,
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
  let searchString = req.body.searchString.trim();

  try {
    console.log(req.body);
    console.log(searchString);

    // let searchResults = await Word.find({ "日本語.日本語単語": searchString }); //working version without wildcard.
    // let searchResults = await Word.find({
    //   "日本語.日本語単語": {
    //     $regex: new RegExp("^" + searchString + ".*"),
    //     $options: "i",
    //   },
    // }); //wildcard, but not fully working

    // let searchResults = await Word.find({
    //   "日本語.日本語単語": {
    //     $regex: new RegExp(searchString),
    //     $options: "i",
    //   },
    // });

    //query to find in any field
    let searchResults = await Word.find({
      $or: [
        { "日本語.日本語単語": searchString },
        { "日本語.平仮名": searchString },
        { "日本語.片仮名": searchString },
        { "日本語.ローマ字": searchString },
        { "英語.英単語": searchString },
      ],
    });
    //this works, but needs wildcard feature added.

    //limit search results to 5
    searchResults = searchResults.slice(0, 5);

    res.render(`search`, {
      searchResults,
      searchString,
      pageTitle: `${searchString}`,
      contentTitle: "Word Search",
      path: `/search`,
      // path: `/search/:${searchString}`,
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
