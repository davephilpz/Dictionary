const winston = require("winston");
const AppError = require("../util/AppError");

//initialize winston to log errors
const appErrorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/app-errors.log" }),
  ],
});
const nonAppErrorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/non-app-errors.log" }),
  ],
});

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    //log internal errors
    appErrorLogger.error({
      message: err.message,
      stack: err.stack,
    });

    //send internal errors to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //hide unknown/outside errors from client
    //log external errors
    nonAppErrorLogger.error({
      message: err.message,
      stack: err.stack,
    });
    //send generic message to client
    res.status(500).json({
      status: "error",
      message: "Oops! Something went wrong.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //500 = internal server error
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.code === 11000) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    sendProdError(err, res);
  }
};
