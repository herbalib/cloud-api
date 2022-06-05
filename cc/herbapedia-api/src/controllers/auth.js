const {con} = require("../config/database.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();

// Register
const register = (req, res) => {
  return res.send('Hi Everyone')
  con.query("SELECT * FROM users WHERE email = ?",[req.body.email], async (query_err, query_res) => {
    // Return if Error or Email Exists
    if (query_err) return res.status(500).send(query_err)
    if(query_res.length != 0) return res.status(500).send('Email Already Exists')
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 160419078)

    // Insert to Users
    // Role column has already have default value "user"
    con.query(
      "INSERT INTO users(name, email, password) VALUES(?,?,?)",
      [req.body.name, req.body.email, hashedPassword],
      function (query_err, query_res) {
        if (query_err) return res.status(500).send(query_err)
        else if(query_res.affectedRows <= 0) return res.status(500).send("No Affected Rows")
        else return res.status(200).send('Registration Success')
      })
  })
}

// Login
const login = (req, res) => {
  console.log('The body is ' + req.body)
  console.log('The email is  ' + req.body.email)
  console.log('The pwd is  ' + req.body.password)
  return res.json(req.body)
    // Get data from body

  con.query("SELECT * FROM users WHERE email = ?",[req.body.email], async (query_err, query_res) => {
    if (query_err) return res.status(500).send(query_err)
    if(query_res.length == 0) return res.status(500).send('Incorrect Email or Password')

    // Get Password 
    db_name = query_res[0].name
    db_pass = query_res[0].password
    db_role = query_res[0].role

    if (await bcrypt.compare(req.body.password, db_pass)){
        // Create JWT
      const payload = { email: req.body.email, role: db_role }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        
      // Update User Token
      con.query(
        "UPDATE users SET token = ? WHERE email = ?",
        [accessToken, req.body.email],
        function (query_err, query_res) {
          if (query_err) return res.status(500).send(query_err)
          else if(query_res.affectedRows <= 0) return res.status(500).send("No Affected Rows")
          else return res.status(200).json({ name: db_name, accessToken: accessToken })
        })
    } else {
      return res.status(500).send('Incorrect Email or Password')
    }
  })
}

// Logout

// Referesh Token

// authenticateToke


//Export All Methods
module.exports = {
  register,
  login
};
