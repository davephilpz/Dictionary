const express = require("express");
const path = require("path");
const get404 = require("./controllers/get404.controller");

const wordRouter = require("./routes/word.router");

const app = express();
app.use(express.json());

//ejs templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//public access middleware
app.use(express.static(path.join(__dirname, "public")));

//test middleware
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

app.use("/", wordRouter);

app.use(get404.get404);

module.exports = app;
