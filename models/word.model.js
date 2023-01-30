const mongoose = require("mongoose");
const slugify = require("slugify");

//only save and create use Mongoose validation so chain them onto find methods etc.
const wordsSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, "Japanese word required. Use kanji if applicable."],
    unique: [true, "duplicate entries are not allowed."],
  },
  nihongo: {
    wordType: {
      type: String,
      enum: ["文語", "口語", "両方", "未定"],
      // default: "unsure",
      message: "type must be written, spoken, both or unsure.",
    },
    furigana: {
      type: [String], // have a space deliminated string for furigana for each word
    },
    hiragana: {
      type: String,
      required: [true, "Must have hiragana as backup search for word."],
    },
    katakana: String, //turn hiragana into this
    romaji: String, //turn hiragana into this
    hinshi: {
      type: String,
      enum: ["名詞", "動詞", "形容詞", "副詞", "その他"],
      required: [true, "Must input part of speech."],
    },
    joshi: {
      type: [String],
    },
    ryaku: {
      type: [String],
    },
    bikouran: {
      type: [String], //comments or explanation of definition because concept does not exist in English etc.
    },
    reibun: [String],
  },
  eigo: {
    teigi: {
      type: String,
      required: [true, "Must enter word meaning in English."],
    },
    nijitekiTeigi: [String], //this is for listing another word in English for the same word in Japanese
    fukusuuTeigi: [String], //this is for listing another definition in English because the Japanese word has multiple definitions
    hinshi: {
      type: String,
      enum: ["名詞", "動詞", "形容詞", "副詞", "その他"],
      required: [true, "Must input part of speech."],
    },
    reibun: [String],
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

//synonym reverse search from English to match all of that word.
