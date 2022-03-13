const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema");
const config = require("../config.json");
const Level = require("../levelmodel/levelschems");

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
router.post(`/level1`, async (req, res) => {
  try {
    const { level } = req.body;
    if (!level) {
      return res.status(400).json({ error: "Answer can't be empty" });
    }
    const levelanswer = await Level.findOne({ level });

    // console.log("after line 73");
    // console.log(levelanswer);
    // console.log(level);
    // if (levelanswer.level == level) {
    //   console.log("after line 77");
    //   console.log(level);
    //   res.status(200).json({
    //     msg: "Correct Answer",
    //     // status: true,
    //   });
    // } else {
    //   res.status(400).json({
    //     msg: "Incorrect Answer",
    //     // status: false,
    //   });
    // }
    if (levelanswer) {
      // console.log("after line 91");
      // console.log(level);
      res.status(200).json({
        msg: "Correct Answer",
        // status: true,
      });
    } else {
      res.status(400).json({
        msg: "Incorrect Answer",
        // status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
