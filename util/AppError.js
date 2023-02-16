class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //only message on super because that is all Error class normally accepts.

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; //identify which are internal app errors.

    Error.captureStackTrace(this, this.constructor); //this prevents this function being called not to appear in call stack as to pollute it.
  }
}

module.exports = AppError;
