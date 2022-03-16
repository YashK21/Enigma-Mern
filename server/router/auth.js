const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema");
const config = require("../config.json");
const Level = require("../levelmodel/levelschems");
var l = 1;
router.post("/register", async (req, res) => {
  const { name, email, username, password, cpassword, level } = req.body;

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
      level,
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
    // console.log(userLogin);
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
router.post(`/level${l}`, async (req, res) => {
  try {
    const { ans } = req.body;
    if (!ans) {
      return res.status(400).json({ error: "Answer can't be empty" });
    }
    const levelans = await Level.findOne({ ans });
    if (levelans) {
      res.status(200).json({
        msg: "Correct Answer",
      });
    } else {
      res.status(400).json({
        msg: "Incorrect Answer",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
