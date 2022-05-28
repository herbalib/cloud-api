const express = require("express");
const app = express();
const router = express.Router();

//Load Router Module
const plants = require("./routes/plants.js");

app.use(express.json());

router
  .get("/", function (req, res) {
    res.send("Hello World!");
  })
  //List of Extenstion Path
  .use("/plants", plants);

module.exports = router;
