const wanakana = require("wanakana");

const Word = require("../models/word.model");

exports.getAdminControls = async (req, res, next) => {
  res.render("admin/admin", {
    pageTitle: "Admin Controls",
    contentTitle: "Admin Controls",
    path: "/admin",
  });
};

exports.getCreateWord = async (req, res, next) => {
  //flash message for success or fail
  // const flashMessage = req.flash("message");

  res.render("admin/admin-add-word", {
    pageTitle: "Add Word",
    contentTitle: "Admin Controls: Add Word",
    path: "/admin/add-word",
    // message: flashMessage,
  });
};

exports.postCreateWord = async (req, res) => {
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

    // const enteredWord = new Word({
    //   日本語: {
    //     日本語単語: 日本語単語,
    //     語類: 語類,
    //     平仮名: 平仮名,
    //     片仮名: katakana,
    //     ローマ字: romaji,
    //     日本語品詞: 日本語品詞,
    //     助詞: 助詞,
    //     略語: 略語,
    //     備考欄: 備考欄,
    //     日本語例文: 日本語例文,
    //   },
    //   英語: {
    //     英単語: 英単語,
    //     二次的定義: 二次的定義,
    //     複数定義: 複数定義,
    //     英語品詞: 英語品詞,
    //     英語例文: 英語例文,
    //   },
    // });

    let enteredWord = new Word({
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

    console.log(enteredWord);

    let newWord = await enteredWord.save().catch((err) => {
      console.log(`error: ${err}`);
    });

    // req.flash("message", `${req.body.word} successfully added`);
    res.status(201).redirect("/admin/add-word");
    // console.log(req.body);
    // window.alert(`${req.body.word} successfully added`);

    // if (res.status === 201) {
    //   ;
    // }
    //   .render("admin/admin-add-word", {
    //   pageTitle: "Add Word",
    //   contentTitle: "Admin Controls: Add Word",
    //   path: "/admin/add-word",
    // });
    //201 means successful post and should be used over 200 the default
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

exports.getUpdateWord = async (req, res, next) => {
  res.render("admin/admin-edit-word", {
    pageTitle: "Edit Word",
    contentTitle: "Admin Controls: Edit Word",
    path: "/admin/edit-word",
  });
};

exports.postUpdateWord = async (req, res) => {
  // try {
  //   const wordToUpdate = await Word.findByIdAndUpdate(
  //     req.body.search,
  //     req.body,
  //     {
  //       new: true,
  //       runValidators: true,
  //     }
  //   );
  //   if (!wordToUpdate) {
  //     console.log("Word not found.");
  //   }
  // } catch (err) {
  //   (err) => {
  //     res.status(400).json({ message: err.message });
  //     //400 means user error
  //     console.log(err);
  //   };
  // }
  // const { word, wordType, nihongo, eigo } = req.body;
  // try {
  //   const wordToUpdate = await Word.findOne({ word: req.params.search });
  //   if (wordToUpdate === null) {
  //     console.log("Word not found.");
  //   } else {
  //     Word.updateOne({ word, wordType, nihongo, eigo }, {});
  //     // res.redirect("/words");
  //   }
  // } catch (err) {
  //   (err) => {
  //     res.status(400).json({ message: err.message });
  //     console.log(err);
  //   };
  // }
};

exports.getDeleteWord = async (req, res, next) => {
  res.render("admin/admin-delete-word", {
    pageTitle: "Delete Word",
    contentTitle: "Admin Controls: Delete Word",
    path: "/admin/delete-word",
  });
};

exports.postDeleteWord = async (req, res) => {
  try {
    // res.render("searchResults", {
    //   //word,
    //   pageTitle: "Search Results",
    //   path: "/words",
    // });
    const word = await Word.findOne({ word: req.params.search });

    if (word === null) {
      console.log("Word not found.");
    } else {
      word.deleteOne();
      console.log(`${word.word} successfully deleted from database.`);
      console.log(word);
      res.status(202).redirect("/");
    }
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};
