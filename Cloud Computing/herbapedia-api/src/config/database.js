var mysql = require('mysql');
require("dotenv").config();

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const query_select = (p_con, sql, params) => {
    return new Promise((resolve, reject) => {
        p_con.query(sql, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    con,
    query_select
}

// Database Schema
// Database Connectiion Name