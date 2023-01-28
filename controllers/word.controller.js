const Word = require("../models/words.model");

exports.findAllWords = async (req, res, next) => {
  try {
    const words = await Word.find();
    res.render("index", {
      //index is the ejs template and path is the url
      words,
      pageTitle: "Dictionary",
      path: "/",
    });
    console.log(words);
  } catch (err) {
    (err) => {
      res.status(500).json({ message: err.message });
      //500 means server error
      console.log(err);
    };
  }
};

exports.findOneWord = async (req, res) => {
  try {
    // const word = await Word.findOne({ word: req.params.search });

    if (word === null) {
      console.log("Word not found.");
    } else {
      // console.log(word);
      res.render("words", {
        // word,
        pageTitle: "Search Results",
        path: "/words/:search",
      });
    }
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

exports.wordLiveSearch = async (req, res, next) => {
  let payload = req.body.payload.trim();
  console.log(payload);
};

//admin functions
exports.getAdminControls = async (req, res, next) => {
  res.render("admin/admin", {
    pageTitle: "Admin Controls",
    path: "/admin",
  });
};

exports.getCreateWord = async (req, res, next) => {
  res.render("admin/admin-add-word", {
    pageTitle: "Add Word",
    path: "/admin/add-word",
  });
};

exports.postCreateWord = async (req, res) => {
  const enteredWord = new Word({
    word: req.body.word,
    nihongo: req.body.nihongo,
    eigo: req.body.eigo,
  });

  try {
    const newWord = await enteredWord.save();
    res.status(201).json(newWord);
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
