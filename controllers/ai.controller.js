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

exports.getCreateWord = catchAsyncErrorHandler(async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  res.render("admin/admin-add-word-ai", {
    pageTitle: "Add Word",
    contentTitle: "",
    message: flashMessage,
    session: req.session,
  });
});

exports.postCreateWord = catchAsyncErrorHandler(async (req, res, next) => {
  const isJson = req.is("application/json");
  const data = req.body;

  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return val.split(/[、;,]/).map((s) => s.trim());
    return [];
  };

  const {
    日本語単語,
    平仮名,
    語類 = "未定",
    俗語 = "",
    振り仮名,
    日本語品詞,
    助詞,
    略語,
    定義,
    使用場面,
    使用場面追加,
    フォーマル度,
    希少度,
    動詞ペア,
    類語・同類表現,
    備考欄,
    日本語例文,

    // 英語側
    英単語,
    二次的定義,
    複数定義,
    英語品詞,
    英語例文,
  } = data;

  if (!日本語単語 || !平仮名 || !日本語品詞 || !英単語 || !英語品詞 || !使用場面 || !使用場面追加 || !定義 || !フォーマル度 || !希少度) {
    return next(new AppError("必須項目が不足しています。", 400));
  }

  const katakana = wanakana.toKatakana(平仮名);
  const romaji = wanakana.toRomaji(平仮名);

  // 重複チェック
  const duplicate = await Word.findOne({ "日本語.日本語単語": 日本語単語 });
  if (duplicate) {
    return next(new AppError(`Duplicate word not allowed: (${日本語単語})`, 400));
  }

  const newWord = new Word({
    日本語: {
      日本語単語,
      平仮名,
      片仮名: katakana,
      ローマ字: romaji,
      語類,
      俗語,
      振り仮名: getArray(振り仮名),
      日本語品詞,
      助詞: getArray(助詞),
      略語: getArray(略語),
      定義: getArray(定義),
      使用場面,
      使用場面追加: getArray(使用場面追加),
      フォーマル度: getArray(フォーマル度).map(String),
      希少度: Number(希少度),
      動詞ペア: getArray(動詞ペア),
      類語: getArray(類語・同類表現),
      備考欄: getArray(備考欄),
      日本語例文: getArray(日本語例文),
    },
    英語: {
      英単語: 英単語.toLowerCase(),
      二次的定義: getArray(二次的定義).map((x) => x.toLowerCase()),
      複数定義: getArray(複数定義).map((x) => x.toLowerCase()),
      英語品詞,
      英語例文: getArray(英語例文).map((x) => x.toLowerCase()),
    },
  });

  await newWord.save();

  if (isJson) {
    return res.status(201).json({ message: "📘 Word added successfully!", word: newWord });
  } else {
    req.flash("message", `✅ Successfully added: (${日本語単語})`);
    return res.status(201).redirect("/admin/add-word");
  }
});

