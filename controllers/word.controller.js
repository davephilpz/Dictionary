const Word = require("../models/words.model");

exports.findAllWords = async (req, res, next) => {
  try {
    const words = await Word.find();
    res.render("index", {
      // words,
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
    res.render("searchResults", {
      //word,
      pageTitle: "Search Results",
      path: "/words",
    });
    const word = await Word.findOne({ word: req.params.search });

    if (word === null) {
      console.log("Word not found.");
    } else {
      console.log(word);
      res.redirect("/");
    }
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};

exports.createWord = async (req, res) => {
  const enteredWord = new Word({
    word: req.body.word,
    wordType: req.body.wordType,
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

exports.updateWord = async (req, res) => {
  const { word, wordType, nihongo, eigo } = req.body;

  try {
    const wordToUpdate = await Word.findOne({ word: req.params.search });
    if (wordToUpdate === null) {
      console.log("Word not found.");
    } else {
      Word.updateOne({ word, wordType, nihongo, eigo });
      // res.redirect("/words");
    }
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });

      console.log(err);
    };
  }
};

exports.deleteWord = async (req, res) => {
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
