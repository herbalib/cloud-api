//Check Email 
const jwt = require('jsonwebtoken')
require("dotenv").config();

const authorize = (req, res, next, whitelisted_roles) => {
    // BEARER Token
    const authHeader = req.headers['authorization']
    
    // Token either undefined, or the Token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403) // Unauthorized
        if(!whitelisted_roles.includes(payload.role)) return res.sendStatus(401) // Check role untuk hak akses
        req.user_email = payload.email
        next()
    })
}

//CheckEmailExist
const middleware_admin = (req, res, next) => {
    authorize(req, res, next, ["admin"])
}

const middleware_user = (req, res, next) => {
    authorize(req, res, next, ["admin", "user"])
}

//Export All Methods
module.exports = {
    middleware_admin, middleware_user
}
  