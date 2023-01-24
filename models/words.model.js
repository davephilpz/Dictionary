const mongoose = require("mongoose");
const slugify = require("slugify");

//only save and create use Mongoose validation so chain them onto find methods etc.
const wordsSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  furigana: [String],
  hiragana: String,
  katakana: String,
  hinshi: {
    meishi: String,
    doushi: String,
    keiyoushi: String,
    fukushi: String,
  },
  eigo: {
    meishi: String,
    doushi: String,
    keiyoushi: String,
    fukushi: String,
  },
  nihongoreibun: [String],
  chuugokugo: {
    meishi: String,
    doushi: String,
    keiyoushi: String,
    fukushi: String,
  },
  chuugokugoreibun: [String],
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
