const mongoose = require("mongoose");
const dotenv = require("dotenv");

const port = process.env.PORT || 3000;
const app = require("./app");
dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
const DB = process.env.LOCAL_DATABASE.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

const server = app.listen(port, () => {
  console.log(`Server now running on ${port}`);
});

//catch all error safety net
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled error. Shutting down server...");

  //call server.close() to allow server to finish current executions before shutting down.
  server.close(() => {
    process.exit(1); //0 = success, 1=exception
  });
});
