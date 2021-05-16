const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* instantiate express router */
const router = express.Router()

/* User model */
const User = require('../models/User')

/* authentication middleware function */
const auth = require('../middleware/auth')

/* declare handlers for requests to: /login */

/*
    Log in user
    POST: /login
    ( public )
*/
router.post('/', async (req, res) => {
    try {
        // check request body for both email and password
        if (!req.body.email || !req.body.password) {
            // if there is no email or no password, throw error
            res.status(400).json({ message: "an email and password are required to log in" })
        } else {
            // if there is both an email and password,
            // check that the requested user exists in mongoDB
            const existingUser = await User.findOne({ email: req.body.email })
            if (!existingUser) {
                // if no user exists in mongoDB, throw error
                res.status(400).json({ message: "no user exists with that email" })
            } else {
                // if the user matches one in mongoDB,
                // check the submitted password against the one stored
                const isMatch = await bcrypt.compare(req.body.password, existingUser.password)
                if (!isMatch) {
                    // if the password doesn't match, throw error
                    res.status(400).json({ message: "invalid password" })
                } else {
                    // if the passwords do match, sign new web token
                    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET) // use { expiresIn: 60 } for session timeouts e.g. 60 seconds
                    console.log(`token: ${token}`)
                    res.status(200).json({
                        isLoggedIn: true,
                        jwt: token,
                        user: {
                            id: existingUser._id,
                            email: existingUser.email,
                            password: existingUser.password,
                            displayName: existingUser.displayName
                        }
                    })
                }
            }
        }
    } catch (err) {
        res.status(500).json({ message: "server error - POST: /login" })
    }
})

module.exports = router