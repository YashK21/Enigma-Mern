const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema");
const config = require("../config.json");
require("../db/conn");
router.post("/register", async (req, res) => {
  const { name, email, username, password, cpassword } = req.body;

  if (!name || !email || !username || !password || !cpassword) {
    return res.status(422).json({ error: "all fileds must be filled" });
  }
  try {
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(422).json({ error: "email exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password don't match" });
    }
    const new_user = new User({
      name,
      email,
      username,
      password,
      cpassword,
    });
    await new_user.save();
    res.status(201).json({ msg: "registered" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: `Any of the filed can't be empty` });
    }
    const userLogin = await User.findOne({ username });
    if (userLogin) {
      const ismatch = await bcrpyt.compare(password, userLogin.password);
      if (!ismatch) {
        res.status(400).json({ msg: "credentials error" });
      } else {
        const payload = {
          " id": userLogin._id,
        };
        jwt.sign(payload, config.jwtkey, { expiresIn: "10h" }, (err, token) => {
          res.json({
            token: token,
            msg: "login successfull",
          });
        });
      }
    } else {
      res.status(400).json({ msg: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
