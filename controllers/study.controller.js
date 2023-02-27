const Study = require("../models/study.model");
const Word = require("../models/word.model");
const cron = require("node-cron");

exports.startCronJob = () => {
  //set word of the day every day at 24:00
  cron.schedule("0 0 * * *", async () => {
    try {
      //create date for new word of the day
      const date = new Date();
      const formattedDate = date.toISOString().substring(0, 10);

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
