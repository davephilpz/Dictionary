const express = require("express");
const path = require("path");
const get404 = require("./controllers/get404.controller");
const cookieParser = require("cookie-parser");
//flash message dependencies:
const session = require("express-session");
const connectFlash = require("connect-flash");

const wordRouter = require("./routes/word.router");
const adminRouter = require("./routes/admin.router");
const loginRouter = require("./routes/login.router");

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
// app.use(cookieParser("secretCookieString"));
// app.use(
//   session({
//     secret: "secretSessionString",
//     cookie: { maxAge: 60000 },
//     resave: true, //true forces sessions to be saved back to session store, even if the session was never modified during the request
//     saveUninitialized: true, //true forces sessions that is initialized to be saved to the store
//   })
// );
// app.use(connectFlash());

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

//admin routes
app.use(adminRouter);

//login routes
app.use(loginRouter);

//search routes
app.use(wordRouter);

//return 404 page when content not found.
app.use(get404.get404);

module.exports = app;
