const mongoose = require("mongoose");
const levelSchema = new mongoose.Schema({
  levelno: {
    type: Number,
  },
  ans: {
    type: String,
  },
});

const Level = mongoose.model("LEVEL", levelSchema);
module.exports = Level;
