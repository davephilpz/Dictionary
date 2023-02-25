const wanakana = require("wanakana");
const catchAsyncErrorHandler = require("../util/catchAsyncErrorHandler");
const AppError = require("../util/AppError");

const Word = require("../models/word.model");

// TODO fix admin search to look like normal search

exports.getAdminControls = catchAsyncErrorHandler(async (req, res, next) => {
  //declare and pass in variables for EJS template to work
  let searchString;
  let searchResults;

  console.log("get admin req headers:", req.headers);

  const flashMessage = req.flash("message");

  res.render("admin/admin", {
    pageTitle: "Admin Controls",
    contentTitle: "Add New Word or Search to Update or Delete",
    searchString,
    searchResults,
    message: flashMessage,
    session: req.session,
  });
});

//Called by getAdminControls by taking in query from URL. Returns query string in GET request and word. User can then click update/delete to perform CRUD or add to add new word.
exports.getEditWord = async (req, res, next) => {
  //get query from url
  console.log("query string:", req.query.word);
  console.log("query:", req.query);
  const searchString = req.query.word.toString();

  console.log("query:", searchString);

  // Find words matching query exactly. Admin can find word in normal search with wildcards if they need to. This is to simplify CRUD operations.
  let searchResults = await Word.find({
    "日本語.日本語単語": searchString,
  });

  console.log("Search Results:", searchResults);

  res.render(`admin/admin-search-results`, {
    searchResults,
    searchString,
    pageTitle: `${searchString}`,
    contentTitle: "Add New Word or Search to Update or Delete",
    session: req.session,
  });
};

exports.getCreateWord = catchAsyncErrorHandler(async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  res.render("admin/admin-add-word", {
    pageTitle: "Add Word",
    contentTitle: "",
    message: flashMessage,
    session: req.session,
  });
});

exports.postCreateWord = catchAsyncErrorHandler(async (req, res, next) => {
  const {
    日本語単語,
    語類,
    平仮名,
    日本語品詞,
    助詞,
    略語,
    備考欄,
    日本語例文,
    英単語,
    二次的定義,
    複数定義,
    英語品詞,
    英語例文,
  } = req.body;

  const katakana = wanakana.toKatakana(平仮名);
  const romaji = wanakana.toRomaji(平仮名);
  // const nihongoReibun = 日本語例文.split("。").join("。,");
  // const nijitekiTeigi = 二次的定義.split(";").join(",");
  // const fukusuuTeigi = 複数定義.split(";").join(",");
  // const eigoReibun = 英語例文.split(".").join(".,");

  const newWordModel = new Word({
    日本語: {
      日本語単語: 日本語単語,
      語類: 語類,
      平仮名: 平仮名,
      片仮名: katakana,
      ローマ字: romaji,
      日本語品詞: 日本語品詞,
      助詞: 助詞,
      略語: 略語,
      備考欄: 備考欄,
      日本語例文: 日本語例文,
    },
    英語: {
      英単語: 英単語,
      二次的定義: 二次的定義,
      複数定義: 複数定義,
      英語品詞: 英語品詞,
      英語例文: 英語例文,
    },
  });

  console.log(newWordModel);

  const newWord = await newWordModel.save((err) => {
    if (!err) {
      req.flash("message", `Successfully added: (${req.body.日本語単語})`);
      res.status(201).redirect("/admin/add-word");
    } else {
      return next(
        new AppError(
          `Duplicate word not allowed: (${req.body.日本語単語})`,
          400
        )
      );
      // if (err.code === 11000) {
      //   req.flash(
      //     "message",
      //     `Duplicate word not allowed: (${req.body.日本語単語})`
      //   );
      // }
      // res.status(400).redirect("/admin/add-word");
      // console.log(`error: ${err}`);
      // console.log(`error: ${err.name}`);
      // console.log(`error: ${err.code}`);
    }
  });
});

exports.getUpdateWord = catchAsyncErrorHandler(async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  const searchString = req.query.word.toString();

  console.log("getUpdateWord query object:", req.url);
  console.log("getUpdateWord query:", searchString);

  // Find words matching query exactly. Admin can find word in normal search with wildcards if they need to. This is to simplify CRUD operations.
  let searchResults = [await Word.findById(searchString)];

  console.log("getUpdateWord Search Results:", searchResults);

  res.render("admin/admin-update-word", {
    pageTitle: "Update Word",
    contentTitle: "",
    message: flashMessage,
    searchString,
    searchResults,
    session: req.session,
  });
  console.log("final search string", searchString);
});

exports.postUpdateWord = catchAsyncErrorHandler(async (req, res, next) => {
  const searchString = req.query.word;

  console.log("submit update word searchString:", searchString);
  console.log("submit update word body:", req.body);

  const {
    日本語単語,
    語類,
    平仮名,
    日本語品詞,
    助詞,
    略語,
    備考欄,
    日本語例文,
    英単語,
    二次的定義,
    複数定義,
    英語品詞,
    英語例文,
  } = req.body;

  console.log("submit update word nihongo:", 日本語単語);

  const katakana = wanakana.toKatakana(平仮名);
  const romaji = wanakana.toRomaji(平仮名);
  // const nihongoReibun = 日本語例文.split("。").join("。,");
  // const nijitekiTeigi = 二次的定義.split(";").join(",");
  // const fukusuuTeigi = 複数定義.split(";").join(",");
  // const eigoReibun = 英語例文.split(".").join(".,");

  const word = [await Word.findById(searchString)];
  console.log("submit update word word find:", word);

  const updatedWord = await Word.findOneAndUpdate(
    { "日本語.日本語単語": searchString },
    {
      $set: {
        日本語: {
          日本語単語: 日本語単語,
          語類: 語類,
          平仮名: 平仮名,
          片仮名: katakana,
          ローマ字: romaji,
          日本語品詞: 日本語品詞,
          助詞: 助詞,
          略語: 略語,
          備考欄: 備考欄,
          日本語例文: 日本語例文,
        },
        英語: {
          英単語: 英単語,
          二次的定義: 二次的定義,
          複数定義: 複数定義,
          英語品詞: 英語品詞,
          英語例文: 英語例文,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).then((updatedWord) => {
    console.log("submit update word updated word:", updatedWord);

    res.status(200).redirect("/admin");
  });
});

exports.getDeleteWord = catchAsyncErrorHandler(async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  const searchString = req.query.word.toString();

  console.log("get delete word query object:", req.url);
  console.log("get delete word query:", searchString);

  // Find words matching query exactly. Admin can find word in normal search with wildcards if they need to. This is to simplify CRUD operations.
  let searchResults = [await Word.findById(searchString)];

  console.log("get delete word Search Results:", searchResults);

  res.render("admin/admin-delete-word", {
    pageTitle: "Update Word",
    contentTitle: "Confirm Word Deletion",
    message: flashMessage,
    searchString,
    searchResults,
    session: req.session,
  });
});

exports.postDeleteWord = catchAsyncErrorHandler(async (req, res, 精密next) => {
  const searchString = req.query.word;

  console.log("submit delete word searchString:", searchString);

  const word = await Word.findByIdAndDelete(searchString).then(
    (deletedWord) => {
      console.log("deleted word:", deletedWord);
      req.flash("message", `Successfully added: (${searchString})`);
      res.status(200).redirect("/admin");
    }
  );
});
