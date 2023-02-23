const Word = require("../models/word.model");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

// TODO query string persists when redirected to homepage from error or login etc. Does not cause any errors, but should be fixed. Also javascript errors occur on pages when user does not have access. Not sure if this is preventable or not.
// TODO add query string to find words based on 2 English secondary arrays as well.

exports.getSearchPage = catchAsyncErrorHandler(async (req, res, next) => {
  res.render("index", {
    pageTitle: "Dictionary",
    contentTitle: "Word Search",
    session: req.session,
  });
});

exports.postLiveSearch = catchAsyncErrorHandler(async (req, res) => {
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

  //limit to 5 results
  matchFound = matchFound.slice(0, 5);

  let searchPredictions = [];
  matchFound.forEach((word) => {
    searchPredictions.push(word.日本語.日本語単語);
  });

  res.send({ searchPredictions });
});

exports.postSearchWord = catchAsyncErrorHandler(async (req, res, next) => {
  //get query from params
  const searchString = req.params.word;

  // const searchString = req.body.searchString.trim();
  const sanitizedSearchString = searchString.replace(/[＊*]/g, " ");
  const query = {};
  const options = { $options: "i" };

  console.log("url params:", searchString);

  // try {
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
  let searchResults = await Word.find(
    {
      //search kanji, hiragana, katakana, romaji and English and return all results
      $or: [
        { "日本語.日本語単語": query.searchString },
        { "日本語.平仮名": query.searchString },
        { "日本語.片仮名": query.searchString },
        { "日本語.ローマ字": query.searchString },
        { "英語.英単語": query.searchString },
        { "英語.二次的定義": query.searchString },
        { "英語.複数定義": query.searchString },
      ],
    },
    options
  );

  // limit search results to 5
  searchResults = searchResults.slice(0, 9999);
  const idStrings = searchResults.map((result) => result._id.toString());

  console.log("word ids:", idStrings);

  res.render(`search`, {
    searchResults,
    searchString,
    pageTitle: `${searchString}`,
    contentTitle: "Word Search",
    session: req.session,
  });
});
