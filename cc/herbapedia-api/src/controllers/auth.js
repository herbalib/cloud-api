const {
  con
} = require("../config/database.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();

// Register
const register = (req, res) => {
  con.query("SELECT * FROM users WHERE email = ?", [req.body.email], async (query_err, query_res) => {
    // Return if Error or Email Exists
    if (query_err) return res.json({
      error: 'Select Existing User Failed',
      success: ''
    })
    else if (query_res.length != 0) return res.json({
      error: 'Email Already Exists',
      success: ''
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 160419078)

    // Insert to Users
    // Role column has already have default value "user"
    con.query(
      "INSERT INTO users(name, email, password) VALUES(?,?,?)",
      [req.body.name, req.body.email, hashedPassword],
      function (query_err, query_res) {
        if (query_err) return res.json({
          error: 'Query Insert User Failed',
          success: ''
        })
        else if (query_res.affectedRows <= 0) return res.json({
          error: 'Insert User Failed',
          success: ''
        })
        else return res.json({
          error: '',
          success: 'Registration Success'
        })
      })
  })
}

// Login
const login = (req, res) => {
  // Get data from body
  con.query("SELECT * FROM users WHERE email = ?", [req.body.email], async (query_err, query_res) => {
    console.log("Email not exists lho, ada : " + query_res.length)
    if (query_err) return res.json({
      error: 'Finding User Information Failed',
      success: ''
    })
    else if (query_res.length == 0) return res.json({
      error: 'Incorrect Email or Password',
      success: ''
    })

    // Get Password 
    db_name = query_res[0].name
    db_pass = query_res[0].password
    db_role = query_res[0].role

    console.log("Comparing " + req.body.password + "With" + db_pass)
    if (await bcrypt.compare(req.body.password, db_pass)) {
      console.log("Good!")
      // Create JWT
      const payload = {
        email: req.body.email,
        role: db_role
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

      // Update User Token
      con.query(
        "UPDATE users SET token = ? WHERE email = ?",
        [accessToken, req.body.email],
        function (query_err, query_res) {
          if (query_err) return res.json({
            error: "Update Token Failed",
            success: ''
          })
          else if (query_res.affectedRows <= 0) return res.json({
            error: "No User Token Affected",
            success: ''
          })
          else return res.json({
            error: '',
            success: 'Login Success',
            name: db_name,
            accessToken: accessToken
          })
        })
    } else {
      console.log("Bad!")
      return res.json({
        error: 'Incorrect Email or Password',
        success: ''
      })
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