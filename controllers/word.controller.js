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
  let liveSearchQuery = req.body.liveSearchQuery.toLowerCase();
  const fields = [
    "日本語.日本語単語",
    "日本語.平仮名",
    "日本語.片仮名",
    "日本語.ローマ字",
    "英語.英単語",
    "英語.二次的定義",
    "英語.複数定義",
  ];
  //create query for words beginning with this. Did wildcards, but current version below only appears when an exact match is found and not partials. Maybe can add more logic to have both?
  const query = {
    $or: fields.map((field) => ({
      [field]: { $regex: new RegExp("^" + liveSearchQuery + ".*", "i") },
    })),
  };

  let matchFound = await Word.find(query).limit(5).exec();

  let searchPredictions = [];
  matchFound.forEach((word) => {
    searchPredictions.push(`${word.日本語.日本語単語} : ${word.英語.英単語}`);
  });

  res.send({ searchPredictions });
});

exports.postSearchWord = catchAsyncErrorHandler(async (req, res, next) => {
  //get query from params
  const searchString = decodeURIComponent(req.params.word).toLowerCase();

  // const searchString = req.body.searchString.trim();
  const sanitizedSearchString = searchString.replace(/[＊*]/g, "");
  const query = {};

  //pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  //filtration
  const partOfSpeechFilter = req.query.filter;

  console.log("url params:", searchString);
  console.log("req.body:", req.body);
  console.log("search string:", searchString);
  console.log("sanitized search string:", sanitizedSearchString);

  if (
    searchString[searchString.length - 1] === "*" ||
    (searchString[searchString.length - 1] === "＊" &&
      searchString[0] === "*") ||
    searchString[0] === "＊"
  ) {
    // If * is at the beginning and end of word, match all words including those letters
    query.searchString = new RegExp(".*" + sanitizedSearchString + ".*");
  } else if (searchString[0] === "*" || searchString[0] === "＊") {
    // If * is at the beginning, match any characters after the word
    query.searchString = new RegExp(".*" + sanitizedSearchString + "$");
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
  let allSearchResults = await Word.find({
    $and: [
      {
        //search kanji, hiragana, katakana, romaji and English and return all results
        $or: [
          { "日本語.日本語単語": query.searchString },
          { "日本語.平仮名": query.searchString },
          { "日本語.片仮名": query.searchString },
          { "日本語.ローマ字": query.searchString },
          { "日本語.助詞": query.searchString }, //remove after editing
          { "英語.英単語": query.searchString },
          { "英語.二次的定義": query.searchString },
          { "英語.複数定義": query.searchString },
        ],
      },
      partOfSpeechFilter ? { "日本語.日本語品詞": partOfSpeechFilter } : {},
    ],
  })
    .lean()
    .exec();

  // //return total matches and pass in for info and render logic
  const totalSearchResults = allSearchResults.length;

  //return only first page initially
  const searchResults = allSearchResults.slice(startIndex, endIndex);

  res.render(`search`, {
    totalSearchResults,
    searchResults,
    searchString,
    page,
    limit,
    partOfSpeechFilter,
    currentPage: page,
    totalPages: Math.ceil(totalSearchResults / limit),
    currentPageStartIndex: startIndex + 1,
    currentPageEndIndex: Math.min(endIndex, totalSearchResults),
    pageTitle: `${searchString}`,
    contentTitle: "Word Search",
    session: req.session,
  });
});
