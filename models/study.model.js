const mongoose = require("mongoose");

const studySchema = new mongoose.Schema({
  wordOfTheDay: {
    type: Map,
    of: String,
    required: [true, "Must input date:word of the day."],
  },
  sentenceOfTheDay: {
    type: Map,
    of: String,
    required: [true, "Must input date:sentence of the day."],
  },
});

module.exports = mongoose.model("Study", studySchema);
