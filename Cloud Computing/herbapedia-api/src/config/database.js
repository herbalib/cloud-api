var mysql = require('mysql');
require("dotenv").config();

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con

// Database Schema
// Database Connectiion Name