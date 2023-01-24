// require("dotenv").config();

// const mongoose = require("mongoose");
// const Word = require("../models/words.model");

// const db = mongoose.connect(
//   process.env.DATABASE_URL,
//   { useNewUrlParser: true },
//   () => {
//     console.log("connected");
//   },
//   (err) => console.error(err)
// );

// db.on("error", (err) => {
//   console.error(err);
// });

async function addWord() {
  //   const word = await Word.create({
  //     日本語: "大成",
  //     振り仮名: ["たい", "せい"],
  //     平仮名: "たいせい",
  //     片仮名: "タイセイ",
  //     品詞: {
  //       名詞: "である",
  //       動詞: "する",
  //       形容詞: "",
  //       副詞: "",
  //     },
  //     英語: {
  //       名詞: "a great success",
  //       動詞: "to succeed greatly",
  //       形容詞: "",
  //       副詞: "",
  //     },
  //     日本語例文: ["事業を大成する。"],
  //     中国語: {
  //       名詞: "",
  //       動詞: "",
  //       形容詞: "",
  //       副詞: "",
  //     },
  //     中国語例文: [],
  //   });

  const findWord = await Word.where("日本語")
    .equals("大成")
    .where("片仮名")
    .equals("タイセイ");
  console.log(findWord);

  //   const deletedUser = await Words.deleteMany({ 日本語: "大成" });
  //   console.log(deletedUser);
  //   await word.save();
  //   console.log(word);
}

addWord();

//mongoose queues all options up and runs them behind the scenes so you do not really need to implement the below:
// mongoose.connect(
//   "mongodb://localhost:27017",
//   () => {
//     console.log("connected");
//   },
//   (err) => console.error(err)
// );
