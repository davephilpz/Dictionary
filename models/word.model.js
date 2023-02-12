const mongoose = require("mongoose");
const slugify = require("slugify");

//only save and create use Mongoose validation so chain them onto find methods etc.
const wordsSchema = new mongoose.Schema(
  {
    日本語: {
      日本語単語: {
        type: String,
        required: [true, "Japanese word required. Use kanji if applicable."],
        unique: [true, "duplicate entries are not allowed."],
      },
      語類: {
        type: String,
        enum: ["文語", "口語", "両方", "未定"],
        message: "type must be written, spoken, both or unsure.",
      },
      振り仮名: {
        type: [String], // have a space deliminated string for furigana for each word
      },
      平仮名: {
        type: String,
        required: [true, "Must have hiragana as backup search for word."],
      },
      片仮名: String, //turn hiragana into this
      ローマ字: String, //turn hiragana into this
      日本語品詞: {
        type: String,
        enum: ["名詞", "動詞", "形容詞", "副詞", "その他"],
        required: [true, "Must input part of speech."],
      },
      助詞: {
        type: [String],
      },
      略語: {
        type: [String],
      },
      備考欄: {
        type: [String], //comments or explanation of definition because concept does not exist in English etc.
      },
      日本語例文: [String],
    },
    英語: {
      英単語: {
        type: String,
        required: [true, "Must enter word meaning in English."],
      },
      二次的定義: [String], //this is for listing another word in English for the same word in Japanese
      複数定義: [String], //this is for listing another definition in English because the Japanese word has multiple definitions
      英語品詞: {
        type: String,
        enum: ["名詞", "動詞", "形容詞", "副詞", "その他"],
        required: [true, "Must input part of speech."],
      },
      英語例文: [String],
    },
    スラグ: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Word", wordsSchema);

//synonym reverse search from English to match all of that word.
