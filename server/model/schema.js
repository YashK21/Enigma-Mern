const mongoose = require("mongoose");
const bcrpyt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

//hashing
userSchema.pre("save", async function (next) {
  // console.log("first");
  if (this.isModified("password")) {
    this.password = await bcrpyt.hash(this.password, 12);
    // console.log(this.password);
    this.cpassword = await bcrpyt.hash(this.cpassword, 12);
  }
  next();
});

const User = mongoose.model("USER", userSchema);
module.exports = User;
