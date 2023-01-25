const Word = require("../models/words.model");

exports.findAllWords = async (req, res, next) => {
  try {
    // const words = await Word.find();
    res.render("index", {
      // words,
      pageTitle: "Dictionary",
      path: "/",
    });
    // console.log(words);
  } catch (err) {
    (err) => {
      res.status(500).json({ message: err.message });
      //500 means server error
      console.log(err);
    };
  }
};

// exports.findWord = async (req, res) => {
//   // const word = new Word({
//   //   word: "",
//   // });
// };

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

// exports.updateWord = async (req, res) => {
//   // const word = new Word({
//   //   word: "",
//   // });
// };

// exports.deleteWord = async (req, res) => {
//   // const word = new Word({
//   //   word: "",
//   // });
// };
