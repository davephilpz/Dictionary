//base router functionality declaractions
const express = require("express");
const path = require("path");

//security middleware declarations
//protect secrets in provess.env variables
require("dotenv").config({ path: "./config.env" });
const rateLimit = require("express-rate-limit");
const xssDef = require("xss-clean"); //xss attack defense
const httpParamPollDef = require("hpp"); //http parameter pollution prevention
const mongoSanitize = require("express-mongo-sanitize"); //mongo query injection defense
const helmet = require("helmet"); //better html headers
// TODO add CSRF handling
// TODO decide on expiration timers for jwt, user session and CSRF session id
// TODO enable https
// TODO enable SSL/TSL encryption
// TODO consider pm2 or systemd if hosting on server that does not have auto restart in prod

//error handling declarations
const get404 = require("./controllers/get404.controller");
const globalErrorHandler = require("./controllers/errorController");

//logging declarations
const speedLogger = require("./middleware/speedLogger");

//compression middleware declarations
const compression = require("compression"); //compressor of text to lower i/o file size.

//cookie handling and jwt dependency declarations
const cookieParser = require("cookie-parser");
//flash message dependencies (session also needed for user session)
const session = require("express-session");
const connectFlash = require("connect-flash");

//session backup declarations
const MongoStore = require("connect-mongodb-session")(session);

//route declarations
const adminRouter = require("./routes/admin.router");
const wordRouter = require("./routes/word.router");
const reviewRouter = require("./routes/review.router");
const authRouter = require("./routes/auth.router");

//use express
const app = express();

//compress i/o to lighten data usage
app.use(compression());

//security middleware
//API request limiter
const limiter = rateLimit({
  max: 100, //#of requests. this is for entire api usage.
  windowMs: 60 * 60 * 1000, //per 60mins
  message:
    "Too many API requests from this IP address. Hourly limit is currently 100 requests.",
});
app.use("/api", limiter);
//converts all html symbols. mongo validation alone protects server against most xss.
app.use(xssDef());
//prevent attacks when duplicate queries etc are sent and change data type etc.
app.use(
  httpParamPollDef({
    whitelist: [
      "日本語.日本語単語",
      "日本語.平仮名",
      "日本語.片仮名",
      "日本語.ローマ字",
      "英語.英単語",
    ],
  })
);
//removes all $ and :. to prevent injections.
app.use(mongoSanitize());
//adds sercurity for headers. Add additional scripts/sources as app grows or needs other CDN, hooks, APIs etc.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);

//logging middleware
app.use(speedLogger);

//data parsing middleware
app.use(express.json({ limit: "10kb" })); //built in middleware that parses post requests with json in body
//looks for header: Content-Type: application/json
//content-type is the mime type of the data being sent; text/html image/png etc.
//if no body to parse, or does not type or an error code, the req body will be an empty object
app.use(express.urlencoded({ extended: true, limit: "10kb" })); //parses post requests with urlencoded payloads. express expects key/value pairs: username=Test&password=MyPasSword!
//mime type = application/x-www-form-urlencoded
//extended true allows objects and arrays to be formatted too. allows this data to be accessed similarly to json data.
//need this for JWT and flash messages and any other cookies for future.
app.use(cookieParser(process.env.COOKIE_KEY));

//ejs templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//public access middleware
app.use(express.static(path.join(__dirname, "public")));

//session middleware
app.use(
  session({
    secret: process.env.SESSION_KEY,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }, // 3 days in milliseconds
    resave: false, //true forces sessions to be saved back to session store, even if the session was never modified during the request. False means only if modified and can improve performance.
    saveUninitialized: true, //true forces sessions that are initialized to be saved to the store
    store: new MongoStore({
      url: process.env.CLOUD_DATABASE,
      autoReconnect: true,
      collection: "sessions",
      ttl: 3 * 24 * 60 * 60, // TTL of 3 days (in seconds)
      autoRemove: "interval",
      autoRemoveInterval: 10, // remove expired sessions every 10 minutes
    }),
  })
);
//
// app.use(
//   session({
//     secret: process.env.SESSION_KEY,
//     cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }, // 3 days in milliseconds
//     resave: false, //true forces sessions to be saved back to session store, even if the session was never modified during the request. False means only if modified and can improve performance.
//     saveUninitialized: true, //true forces sessions that are initialized to be saved to the store
//   })
// );

//flash message middleware
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

//admin routes
app.use("/admin", adminRouter);
//search routes
app.use(wordRouter);
//review routes
app.use(reviewRouter);
//login routes
app.use(authRouter);

//return 404 page when content not found.
// app.use(get404.get404);

//global error handler
//express automatically knows it is an error hanlder by specifying 4 arguments.
//express will assume any argument passed into next() to be an error and will skip all other middleware.
// app.use(globalErrorHandler);

module.exports = app;
