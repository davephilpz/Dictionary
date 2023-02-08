const wanakana = require("wanakana");

const Word = require("../models/word.model");

exports.getAdminControls = async (req, res, next) => {
  res.render("admin/admin", {
    pageTitle: "Admin Controls",
    contentTitle: "Admin Controls",
    path: "/admin",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getCreateWord = async (req, res, next) => {
  //flash message for success or fail
  const flashMessage = req.flash("message");

  res.render("admin/admin-add-word", {
    pageTitle: "Add Word",
    contentTitle: "Admin Controls: Add Word",
    path: "/admin/add-word",
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

exports.getEditWord = async (req, res, next) => {
  res.render("admin/admin-edit-word", {
    pageTitle: "Edit Word",
    contentTitle: "Admin Controls: Edit Word",
    path: "/admin/edit-word",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postEditWord = async (req, res) => {
  //get query from params
  // const searchString = req.params.word;
  const searchString = req.query.word.toString();
  console.log("query:", searchString);
  // console.log("query:", searchQuery);

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

    res.render(`admin/admin-edit-word-search`, {
      searchResults,
      searchString,
      pageTitle: `${searchString}`,
      contentTitle: "Add New Word or Search to Update or Delete",
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

exports.postUpdateWord = async (req, res) => {
  const searchString = req.query.word.toString();
  console.log("query:", searchString);
};

exports.getDeleteWord = async (req, res, next) => {
  res.render("admin/admin-delete-word", {
    pageTitle: "Delete Word",
    contentTitle: "Admin Controls: Delete Word",
    path: `/admin/delete-word/${req.params.id}`,
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postDeleteWord = async (req, res) => {
  try {
    let searchString = req.body.searchString.trim();
    console.log(searchString);

    let searchResults = await Word.find({
      "日本語.日本語単語": { searchString },
    });
    //limit search results to 5
    searchResults = searchResults.slice(0, 5);

    res.render("/admin/admin-delete-word", {
      searchResults,
      searchString,
      pageTitle: `search: ${searchString}`,
      contentTitle: "Word Search",
      path: `/admin/admin-delete-word/:id`,
      isAuthenticated: req.isLoggedIn,
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
