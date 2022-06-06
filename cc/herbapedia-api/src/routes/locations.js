const express = require("express");
const router = express.Router();
const {middleware_admin, middleware_user} = require("../helpers/authorize")
// Load Controller
const locations = require("../controllers/locations");

router.get("/plants", middleware_user, locations.index)
router.post("/plants", middleware_user, locations.store)
router.get("/plants/:plant_id", middleware_user, locations.show)

module.exports = router;
