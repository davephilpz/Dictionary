//This converts CSV file to JSON for databasing.

const csvtojson = require("csvtojson");
// const jsontocsv = require("jsontocsv").parse;
const fs = require("fs");

csvtojson()
  .fromFile("./data/import.csv")
  .then((json) => {
    console.log(json);
    fs.writeFileSync(
      "./data/export.json",
      JSON.stringify(json),
      "utf-8",
      (err) => {
        console.log(err);
      }
    );
  });
