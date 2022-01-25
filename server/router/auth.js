const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema");
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
        jwt.sign(payload, "enigma", { expiresIn: "10h" }, (err, token) => {
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

// router.get("/welcome", (req, res) => {
//   jwt.verify(token, "enigma", (err, authData) => {
//     if (err) {
//       res.status(403);
//     } else {
//       res.json({
//         authData,
//       });
//     }
//   });
// });
// router.post("/welcome", verifytoken, (req, res) => {
//   jwt.verify(req.token, "enigma", (err, authData) => {
// if (err) {
//   res.status(403);
// } else {
//   res.json({
//     authData,
//   });
//     }
//   });
// });
// function verifytoken(req, res, next) {
//   const authheader = req.header["authorization"];
//   if (typeof authheader != "undefined") {
//     const header = authheader.split(" ");
//     const headertoken = header[1];
//     req.token = headertoken;
//     next();
//   } else {
//     res.status(403);
//   }
// }
module.exports = router;
