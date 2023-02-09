const wanakana = require("wanakana");

const Word = require("../models/word.model");

exports.getAdminControls = async (req, res, next) => {
  //declare and pass in variables
  let searchString;
  let searchResults;

  res.render("admin/admin", {
    pageTitle: "Admin Controls",
    contentTitle: "Add New Word or Search to Update or Delete",
    path: "/admin",
    isAuthenticated: req.isLoggedIn,
    searchString,
    searchResults,
  });
};

//Called by getAdminControls by taking in query from URL. Returns query string in GET request and word. User can then click update/delete to perform CRUD or add to add new word.
exports.getEditWord = async (req, res) => {
  //get query from url
  const searchString = req.query.word.toString();

  console.log("query:", searchString);

  try {
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
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

exports.getCreateWord = async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  res.render("admin/admin-add-word", {
    pageTitle: "Add Word",
    contentTitle: "",
    isAuthenticated: req.isLoggedIn,
    message: flashMessage,
  });
};

exports.postCreateWord = async (req, res) => {
  console.log(req.body);
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

  try {
    const katakana = wanakana.toKatakana(平仮名);
    const romaji = wanakana.toRomaji(平仮名);
    const nihongoReibun = 日本語例文.split(";").join(",");
    const nijitekiTeigi = 二次的定義.split(";").join(",");
    const fukusuuTeigi = 複数定義.split(";").join(",");
    const eigoReibun = 英語例文.split(";").join(",");

    const enteredWord = new Word({
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
        日本語例文: nihongoReibun,
      },
      英語: {
        英単語: 英単語,
        二次的定義: nijitekiTeigi,
        複数定義: fukusuuTeigi,
        英語品詞: 英語品詞,
        英語例文: eigoReibun,
      },
    });

    console.log(enteredWord);

    const newWord = await enteredWord.save((err) => {
      if (!err) {
        req.flash("message", `Successfully added: (${req.body.日本語単語})`);
        res.status(201).redirect("/admin/add-word");
      } else {
        if (err.code === 11000) {
          req.flash(
            "message",
            `Duplicate word not allowed: (${req.body.日本語単語})`
          );
        }
        res.status(400).redirect("/admin/add-word");
        console.log(`error: ${err}`);
        console.log(`error: ${err.name}`);
        console.log(`error: ${err.code}`);
      }
    });
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      console.log(err);
    };
  }
};

exports.getUpdateWord = async (req, res) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  const searchString = req.query.word;

  console.log("query:", searchString);

  try {
    // Find words matching query exactly. Admin can find word in normal search with wildcards if they need to. This is to simplify CRUD operations.
    let searchResults = await Word.find({
      "日本語.日本語単語": searchString,
    });

    console.log("Search Results:", searchResults);

    res.render("admin/admin-update-word", {
      pageTitle: "Add Word",
      contentTitle: "",
      isAuthenticated: req.isLoggedIn,
      message: flashMessage,
      searchString,
      searchResults,
    });
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

exports.postUpdateWord = async (req, res) => {
  const searchString = req.query.word.toString();
  console.log("query:", searchString);
};

exports.getDeleteWord = async (req, res, next) => {
  res.render("admin/admin-delete-word", {
    pageTitle: "Delete Word",
    contentTitle: "Admin Controls: Delete Word",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postDeleteWord = async (req, res) => {};
