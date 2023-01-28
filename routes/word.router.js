const express = require("express");
const app = express();

const wordController = require("../controllers/word.controller");

const router = express.Router();

// router.get("/", wordController.findAllWords);
// router.get("/", wordController.findOneWord);
// router.post("/", wordController.createWord);

router.route("/").get(wordController.findAllWords);

// .post(wordController.createWord);

app.post("/getWords", (req, res) => {
  let payload = req.body.payload.trim();
  console.log(payload);
});

// router.route("/getWords").post(wordController.wordLiveSearch);
// .patch(wordController.updateWord)
// .delete(wordController.deleteWord);

module.exports = router;
