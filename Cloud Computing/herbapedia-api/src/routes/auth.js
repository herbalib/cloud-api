require("dotenv").config();

const express = require("express");
const app = express();

//Initiate JWT
const jwt = require("jsonwebtoken");

//make sure app can use json
app.use(express.json());