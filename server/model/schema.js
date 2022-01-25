const mongoose = require("mongoose");
const bcrpyt = require("bcryptjs");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
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
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
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

//token gen
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, config.key);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//     console.log(token);
//   } catch (err) {
//     console.log(err);
//   }
// };

const User = mongoose.model("USER", userSchema);
module.exports = User;
