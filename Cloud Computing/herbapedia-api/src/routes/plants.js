const express = require("express");
const router = express.Router();
const {middleware_admin, middleware_user} = require("../helpers/authorize")

// Load Controller
const plants = require("../controllers/plants");

// Handle Multipart Data
const multer = require('multer');
const upload = multer()

router.get("/", middleware_user, plants.index)
router.post("/predict", [middleware_user, upload.single('image')], plants.predict)

module.exports = router;
