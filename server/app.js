const express = require("express");
const app = express();
const config = require("../server/config.json");
const connection = require("./router/auth");
require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));
app.get("/", (req, res) => {
  res.send(`Home from server`);
});
app.get("/login", (req, res) => {
  res.send(`Login from server`);
});
app.get("/register", (req, res) => {
  res.send(`Registration from server`);
});

app.listen(config.port, () => {
  console.log(`Listening at ${config.port}`);
});
