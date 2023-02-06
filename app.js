const express = require("express");
const path = require("path");
const get404 = require("./controllers/get404.controller");
const cookieParser = require("cookie-parser");
//flash message dependencies:
const session = require("express-session");
const connectFlash = require("connect-flash");

const adminRouter = require("./routes/admin.router");
const wordRouter = require("./routes/word.router");
const reviewRouter = require("./routes/review.router");
const authRouter = require("./routes/auth.router");

const app = express();
app.use(express.json()); //built in middleware that parses post requests with json in body
//looks for header: Content-Type: application/json
//content-type is the mime type of the data being sent; text/html image/png etc.
//if no body to parse, or does not type or an error code, the req body will be an empty object
app.use(express.urlencoded({ extended: true })); //parses post requests with urlencoded payloads. express expects key/value pairs: username=Test&password=MyPasSword!
//mime type = application/x-www-form-urlencoded
//extended true allows objects and arrays to be formatted too. allows this data to be accessed similarly to json data.

//ejs templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//public access middleware
app.use(express.static(path.join(__dirname, "public")));

//flash message middleware
app.use(cookieParser("secretCookieString")); //need to enter some string

//must initialize session to allow connect-flash to work
app.use(
  session({
    secret: "secretSessionString",
    cookie: { maxAge: 60000 },
    resave: true, //true forces sessions to be saved back to session store, even if the session was never modified during the request
    saveUninitialized: true, //true forces sessions that is initialized to be saved to the store
  })
);
app.use(connectFlash());

//test middleware
app.use((req, res, next) => {
  // console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

//find test user and save them into req object
// app.use((req, res, next) => {
//   User.findById("admin@example.com")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//admin routes
app.use("/admin", adminRouter);
//search routes
app.use(wordRouter);
//review routes
app.use(reviewRouter);
//login routes
app.use(authRouter);

//return 404 page when content not found.
app.use(get404.get404);

module.exports = app;
