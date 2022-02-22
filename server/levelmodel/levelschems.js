const mongoose = require("mongoose");
const levelSchema = new mongoose.Schema({
  level: {
    type: String,
  },
});

const Level = mongoose.model("LEVEL", levelSchema);
module.exports = Level;
