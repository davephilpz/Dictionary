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
      俗語: {
        type: String,
        enum: ["俗語", "造語", ""],
        default: "",
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
      定義: {
        type: [String],
        required: [true, "Must enter definition for the word."],
      },
      使用場面: {
        type: String,
        enum: ["フォーマル", "カジュアル"],
        required: [true, "Must enter use situation."],
      },
      使用場面追加: {
        type: [String],
        required: [true, "Must enter use situation opposite use info."],
      },
      フォーマル度: {
        type: [String],
        required: [true, "Must input level of formality."],
      },
      希少度: {
        type: Number,
        min: [1, "希少度は1以上である必要があります。"],
        max: [10, "希少度は10以下である必要があります。"],
        required: [true, "Must input rareness of word."],
      },
      動詞ペア: {
        type: [String],
      },
      類語: {
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
