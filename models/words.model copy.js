const mongoose = require("mongoose");
const slugify = require("slugify");

//only save and create use Mongoose validation so chain them onto find methods etc.
const wordsSchema = new mongoose.Schema({
  word: {
    type: [String],
    required: [true, "Japanese word required. Use kanji if applicable."],
    unique: [true, "duplicate entries are not allowed."],
  },
  nihongo: {
    wordType: {
      type: String,
      enum: ["written", "spoken", "both", "unsure"],
      default: "unsure",
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
      enum: ["meishi", "doushi", "keiyoushi", "fukushi", "sonota"],
      required: [true, "Must input part of speech."],
    },
    joshi: {
      type: [String],
      required: [true, "Must input particle type."],
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
    nijitekiTeigi: [String], //this is for listing another word in English for the same word in Japanese
    fukusuuTeigi: [String], //this is for listing another definition in English because the Japanese word has multiple definitions
    hinshi: {
      type: String,
      enum: ["meishi", "doushi", "keiyoushi", "fukushi", "sonota"],
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
