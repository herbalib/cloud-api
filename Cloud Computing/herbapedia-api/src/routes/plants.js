const express = require("express");
const router = express.Router();
const {middleware_admin, middleware_user} = require("../helpers/authorize")
// Load Controller
const plants = require("../controllers/plants");

router.get("/", middleware_user, plants.index)
router.get("/:id", middleware_user, plants.index)
router.get("/predict", middleware_user, plants.index)

module.exports = router;
