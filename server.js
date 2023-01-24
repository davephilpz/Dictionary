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
