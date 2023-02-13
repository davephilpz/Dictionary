const Word = require("../models/word.model");

// exports.getReviewWords = async (req, res) => {
//   try {
//     res.render("review", {
//       pageTitle: "Review",
//       contentTitle: "Word Review",
//       path: "/",
//       isAuthenticated: req.isLoggedIn,
//     });
//   } catch (err) {
//     (err) => {
//       res.status(500).json({ message: err.message });
//       //500 means server error
//       console.log(err);
//     };
//   }
// };

exports.getReviewWords = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const wordsPerPage = 1;
  let paginationResults = [];

  // let searchResults = await Word.aggregate([{ $sample: { size: 10 } }])
  //   .catch((err) => {
  //     console.log(err);
  //   })

  // .then(() => {
  // res.status(200).json(searchResults);
  res.render("review", {
    pageTitle: "Review",
    contentTitle: "Word Review",
    path: "/",
    // searchResults,
    userAuthId: req.userAuthId,
    session: req.session,
  });
  // })
  // .catch((err) => {
  //   err.message;
  // });
};

exports.postReviewWords = async (req, res) => {
  try {
    const { message } = req.body;
    const page = req.query.page || 1;
    const pages = 10;
    const wordsPerPage = 1;
    let searchResults = [];

    searchResults = await Word.aggregate([{ $sample: { size: 10 } }])
      .skip(page * (wordsPerPage - 1))
      .limit(wordsPerPage)
      // .toArray()
      // .forEach((word) => {
      //   paginationResults.push(word);
      // })
      .then((searchResults) => {
        // console.log(searchResults);
        // console.log(searchResults[0].日本語.日本語単語);
        // console.log("Search Results:", searchResults);
        res.render("review-results", {
          pageTitle: "Review",
          contentTitle: "Word Review",
          searchResults,
          pages,
          userAuthId: req.userAuthId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    (err) => {
      res.status(400).json({ message: err.message });
      //400 means user error
      console.log(err);
    };
  }
};
