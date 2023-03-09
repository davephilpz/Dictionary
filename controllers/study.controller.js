const Study = require("../models/study.model");
const Word = require("../models/word.model");
const cron = require("node-cron");

exports.startWordCronJob = () => {
  //set word of the day every day at 24:00
  cron.schedule("0 0 * * *", async () => {
    try {
      //create date for new word of the day
      const date = new Date();
      const utcDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );
      utcDate.setDate(utcDate.getDate() + 1);
      const formattedDate = utcDate.toISOString().substring(0, 10);

      // Select a random word from somewhere
      const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
      const formattedWord = randomWord[0].日本語.日本語単語;

      // Create a new WordOfTheDay document and save it to the database
      // const wordOfTheDay = { [formattedDate]: formattedWord };
      // const newWordOfTheDay = new Study({ wordOfTheDay });
      // await newWordOfTheDay.save();

      const update = {
        $set: { [`wordOfTheDay.${formattedDate}`]: formattedWord },
      };
      await Study.updateOne({}, update, { upsert: true });

      console.log(`Added new word of the day to database: ${wordOfTheDay}`);
    } catch (err) {
      console.error(`Error adding word of the day: ${err}`);
    }
  });
};

exports.startSentenceCronJob = () => {
  //set example sentence of the day every day at 24:00
  cron.schedule("0 0 * * *", async () => {
    try {
      //create date for new example sentence of the day
      const date = new Date();
      const utcDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );
      utcDate.setDate(utcDate.getDate() + 1);
      const formattedDate = utcDate.toISOString().substring(0, 10);

      // Query for all words with example sentences
      const wordsWithExamples = await Word.find(
        { "日本語.日本語例文": { $exists: true, $not: { $size: 0 } } },
        { "日本語.日本語例文": 1 }
      );

      // Put all example sentences into an array
      let exampleSentences = [];
      wordsWithExamples.forEach((word) => {
        exampleSentences = exampleSentences.concat(word.日本語.日本語例文);
      });

      // Select a random example sentence
      const randomIndex = Math.floor(Math.random() * exampleSentences.length);
      const randomExampleSentence = exampleSentences[randomIndex];

      // Set the example sentence of the day
      const update = {
        $set: {
          [`sentenceOfTheDay.${formattedDate}`]: randomExampleSentence,
        },
      };
      await Study.updateOne({}, update, { upsert: true });

      console.log(
        `Added new example sentence of the day to database: ${randomExampleSentence}`
      );
    } catch (err) {
      console.error(`Error adding example sentence of the day: ${err}`);
    }
  });
};
