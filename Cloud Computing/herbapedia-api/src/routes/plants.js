const express = require("express");
const router = express.Router();
const { getAllPlants } = require("../controllers/plants");

//GET: URL/Plants
router.get("/", getAllPlants)

//GET:
router.get("/:id", (req, res) => {
  res.send("Display All plants");
});

module.exports = router;
