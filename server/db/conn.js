const mongoose = require("mongoose");
const config = require("../config.json");
mongoose
  .connect(config.db)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
