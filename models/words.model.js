const mongoose = require("mongoose");
const slugify = require("slugify");

//only save and create use Mongoose validation so chain them onto find methods etc.
const wordsSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, "Japanese word required. Use kanji if applicable."],
  },
  wordType: {
    type: String,
    enum: ["written", "spoken", "both", "unsure"],
    default: "unsure",
  },
  nihongo: {
    furigana: {
      type: [String],
    },
    hiragana: {
      type: String,
      required: [true, "Must have hiragana as backup search for word."],
    },
    katakana: String,
    nihongoHinshi: {
      meishi: String,
      doushi: String,
      keiyoushi: String,
      fukushi: String,
    },
    nihongoReibun: [String],
  },
  eigo: {
    eigoHinshi: {
      meishi: String,
      doushi: String,
      keiyoushi: String,
      fukushi: String,
    },
    eigoReibun: [String],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
    select: false, //turns off appearances in queries
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false, //turns off appearances in queries
  },
  slug: String,
});

module.exports = mongoose.model("Word", wordsSchema);
