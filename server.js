//basic delcarations
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config({ path: "./config.env" });

//cron jobs
const {
  startWordCronJob,
  startSentenceCronJob,
} = require("./controllers/study.controller");

//logger
const winston = require("winston");

//server port
const port = process.env.PORT || 3000;

//initialiaze logger to track errors
const unhandledRejectionLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/unhandled-rejections.log" }),
  ],
});

const unhandledExceptionLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/unhandled-exceptions.log" }),
  ],
});

//database config with mongoose framework to Atlas cloud
mongoose.set("strictQuery", false);
const DB = process.env.CLOUD_DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

//run cron jobs
startWordCronJob();
startSentenceCronJob();

//run server
const server = app.listen(port, () => {
  console.log(`Server now running on ${port}`);
});

// catch all unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection. Shutting down server...");

  unhandledRejectionLogger.error("Unhandled Rejection", err);

  //call server.close() to allow server to finish current executions before shutting down.
  server.close(() => {
    process.exit(1); //0 = success, 1=exception
  });
});

//catch all unhandled errors
process.on("unhandledException", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled exception. Shutting down server...");

  unhandledExceptionLogger.error("Unhandled Exception", err);

  //call server.close() to allow server to finish current executions before shutting down.
  server.close(() => {
    process.exit(1); //0 = success, 1=exception
  });
});
