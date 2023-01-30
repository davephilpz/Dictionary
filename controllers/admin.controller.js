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
    word,
    gorui,
    hiragana,
    nihongoHinshi,
    joshi,
    ryaku,
    bikouran,
    nihongoReibun,
    eigoTeigi,
    nijitekiTeigi,
    fukusuuTeigi,
    eigoHinshi,
    eigoReibun,
  } = req.body;

  try {
    const katakana = wanakana.toKatakana(hiragana);
    const romaji = wanakana.toRomaji(hiragana);

    console.log(`katakana ${katakana}, romaji: ${romaji}`);

    const newWord = {
      word: req.body.word,
      nihongo: {
        hiragana: req.body.hiragana,
        hinshi: req.body.nihongoHinshi,
      },
      eigo: {
        teigi: req.body.eigoTeigi,
        hinshi: req.body.eigoHinshi,
      },
    };

    // const enteredWord = new Word({
    //   word: word,
    //   nihongo: {
    //     wordType: gorui,
    //     furigana: "",
    //     hiragana: hiragana,
    //     katakana: katakana,
    //     romaji: romaji,
    //     hinshi: nihongoHinshi,
    //     joshi: joshi,
    //     ryaku: ryaku,
    //     bikouran: bikouran,
    //     reibun: nihongoReibun,
    //   },
    //   eigo: {
    //     teigi: eigoTeigi,
    //     nijitekiTeigi: nijitekiTeigi,
    //     fukusuuTeigi: fukusuuTeigi,
    //     hinshi: eigoHinshi,
    //     reibun: eigoReibun,
    //   },
    // });

    console.log(newWord);
    await new Word(newWord).save();
    // await newWord.save();
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
