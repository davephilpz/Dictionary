const Word = require("../models/word.model");

exports.getSearchPage = async (req, res, next) => {
  try {
    res.render("index", {
      pageTitle: "Dictionary",
      contentTitle: "Word Search",
      userAuthId: req.userAuthId,
      session: req.session,
    });

    console.log("home user auth id:", req.userAuthId);
  } catch (err) {
    (err) => {
      res.status(500).json({ message: err.message });
      //500 means server error
      console.log(err);
    };
  }
};

exports.postLiveSearch = async (req, res) => {
  let liveSearchQuery = req.body.liveSearchQuery;
  const fields = [
    "日本語.日本語単語",
    "日本語.平仮名",
    "日本語.片仮名",
    "日本語.ローマ字",
    "英語.英単語",
  ];
  const query = {
    $or: fields.map((field) => ({
      [field]: { $regex: new RegExp("^" + liveSearchQuery + ".*", "i") },
    })),
  };

  let matchFound = await Word.find(query).exec();

  // let matchFound = await Word.find({
  //   $or: [
  //     {
  //       "日本語.日本語単語": {
  //         $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //       },
  //     },
  //     {
  //       "日本語.平仮名": {
  //         $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //       },
  //     },
  //     {
  //       "日本語.片仮名": {
  //         $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //       },
  //     },
  //     {
  //       "日本語.ローマ字": {
  //         $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //       },
  //     },
  //     {
  //       "英語.英単語": {
  //         $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //       },
  //     },
  //   ],
  // }).exec();

  // let matchFound = await Word.find({
  //   "日本語.日本語単語": {
  //     $regex: new RegExp("^" + liveSearchQuery + ".*", "i"),
  //   },
  // }).exec();

  console.log("matchFound:", matchFound);

  //limit to 5 results
  matchFound = matchFound.slice(0, 5);

  let searchPredictions = [];
  matchFound.forEach((word) => {
    searchPredictions.push(word.日本語.日本語単語);
  });

  res.send({ searchPredictions });
};

exports.postSearchWord = async (req, res, next) => {
  //get query from params
  const searchString = req.params.word;

  // const searchString = req.body.searchString.trim();
  const sanitizedSearchString = searchString.replace(/[＊*]/g, "");
  const query = {};

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

    //can add this later for case sensitivity issues or the below DRYer version
    //     { "日本語.日本語単語": { $regex: query.searchString, $options: "i" } },
    // { "日本語.平仮名": { $regex: query.searchString, $options: "i" } },
    // { "日本語.片仮名": { $regex: query.searchString, $options: "i" } },
    // { "日本語.ローマ字": { $regex: query.searchString, $options: "i" } },
    // { "英語.英単語": { $regex: query.searchString, $options: "i" } },

    // const fields = [
    //   "日本語.日本語単語",
    //   "日本語.平仮名",
    //   "日本語.片仮名",
    //   "日本語.ローマ字",
    //   "英語.英単語",
    // ];

    // const query = {
    //   $or: fields.map((field) => ({
    //     [field]: { $regex: query.searchString, $options: "i" },
    //   })),
    // };

    // let searchResults = await Word.find(query);

    // limit search results to 5
    searchResults = searchResults.slice(0, 9999);
    const idStrings = searchResults.map((result) => result._id.toString());

    console.log("word ids:", idStrings);

    res.render(`search`, {
      searchResults,
      searchString,
      pageTitle: `${searchString}`,
      contentTitle: "Word Search",
      userAuthId: req.userAuthId,
      session: req.session,
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
