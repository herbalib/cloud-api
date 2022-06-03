const express = require("express");
const app = express();
const router = express.Router();


app.use(express.json());

router
  .get("/", function (req, res) {
    res.send("Hello World!");
  })
  //List of Extenstion Path
router.use("/plants", plants);
router.use("/auth", auth);

module.exports = router;
