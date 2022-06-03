require('dotenv').config() // Access to .env file

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    { username: "Theo", title: "Post 1" },
    { username: "Kyle", title: "Post 2" }
]

// Middleware
const authenticateToken = (req, res, next) => {
    // BEARER Token
    const authHeader = req.headers['authorization']
    
    // Token either undefined, or the Token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        console.log(payload)
        // If the token is false, not from our generator
        if (err) return res.sendStatus(403)

        // Check to DB if it is the real token pemiliknya kyle
        // SELECT token FROM users WHERE username == `payload.username`
        var token_kyle = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJlbWFpbCI6ImhhbG9AZ21haWwuY29tIiwiaWF0IjoxNjU0MjQ1MTY5fQ.MzBRmC0xIU3kMK4hbMpquH9HyERqN8KNrqfRT5V6Ytw'
        if(token_kyle != token) return res.sendStatus(401)
        
        req.user_payload = payload
        next()
    })
}

app.get('/posts', authenticateToken, (req, res) => {
    res.send('Hi you have succesfully make a request with ' + req.user_payload.username)
})

app.post('/login', (req, res) => {
    // Get Body
    const username = req.body.username

    // Check user exists DB

    // User Exists, Sign Payload
    const payload = { username: username, email: 'halo@gmail.com' }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    // Update user token to DB

    // Return Token
    res.json({ accessToken: accessToken })
})


app.listen(3000)