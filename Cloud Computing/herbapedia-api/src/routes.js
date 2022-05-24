const {Router} = require("express");

Router.get("/", function (req, res) {
  res.send("Hello World!");
});

module.exports = Router;