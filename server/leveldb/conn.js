const mongoose = require("mongoose");
const config = require("../config.json");
mongoose.createConnection(config.leveldb, () => {
  console.log("Level DB Connected");
});
module.exports = mongoose;
