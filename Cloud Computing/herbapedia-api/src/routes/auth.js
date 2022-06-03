const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

// Authentication
router.post("/login", login);
router.post("/register", register);


module.exports = router;