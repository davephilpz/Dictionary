const winston = require("winston");

// Create a new logger instance for 404 errors
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "my-app" },
  transports: [
    new winston.transports.File({ filename: "logs/404-errors.log" }),
  ],
});

exports.get404 = (req, res, next) => {
  // Log the 404 error using the logger instance
  logger.log({
    level: "info",
    message: `404 error: ${req.url}`,
  });

  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    contentTitle: "",
    path: "/404",
    session: req.session,
  });
};

//app.use handles all http requests and not specifying a route means that anything that is not matched to above routes (ran in order) will be caught in this middleware.
