const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/* instantiate express router */
const router = express.Router()

/* User model */
const User = require('../models/User')

/* authentication middleware function */
const auth = require('../middleware/auth')

/* declare handlers for requests to: /api/users */

/*  
    Create new user
    POST: /api/users/ 
    ( public )
*/
router.post('/', async (req, res) => {
    try {
        // check request body for both the new user's email and password
        if (!req.body.email || !req.body.password) {
            // if there is no email or no password, return error
            res.status(400).json({ message: "an email and password are required to register a new user" })
        } else {
            // if there is both an email and a password, 
            // check if the email is already associated with a registered account
            const existingUser = await User.findOne({ email: req.body.email })
            if (existingUser) {
                // if the email is already in use, return error
                res.status(400).json({ message: "there is already an account registered with that email" })
            } else {
                // if the email is available, 
                // create hash from password
                const salt = await bcrypt.genSalt()
                const passwordHash = await bcrypt.hash(req.body.password, salt)                
                // create new instance of User model,
                // saving has as password value for security
                const newUser = new User({
                    email: req.body.email,
                    password: passwordHash,
                    displayName: req.body.displayName
                })
                // save new user
                await newUser.save(() => {
                    console.log('new user created')
                })

                // log user in
                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

                res.status(201).json({
                    isLoggedIn: true,
                    jwt: token,
                    user: newUser
                })
            }
        }
    } catch (err) {
        res.status(500).json({ message: "server error - POST: /api/users" })
    }
})

/*  
    Delete a user
    DELETE: /api/users/:id 
    ( auth required )
*/
router.delete('/:id', auth, async (req, res) => {
    try {
        // check that the requested user exists in mongoDB
        const user = await User.find({ _id: req.params.id })
        if (user) {
            // if the user exists in mongoDB, delete user profile
            await User.deleteOne({ _id: req.params.id })
            res.status(204).end()
        } else {
            // if no matching user is found in mongoDB, throw error
            res.status(404).json({ message: "No matching user found" })
        }
    } catch (err) {
        res.status(500).json({ message: "GET one server error" })
    }
})

/*  
    Return a user
    GET: /api/users/:id 
    ( public )
*/
router.get('/:id', async (req, res) => {
    try {
        // check that the requested user exists in mongoDB
        const user = await User.find({ _id: req.params.id })
        if (user) {
            // if the user exists in mongoDB, return in response
            res.status(200).json(user)
        } else {
            // if no item is found in mongoDB, throw error
            res.status(404).json({ message: "No matching user found" })
        }
    } catch (err) {
        res.status(500).json({ message: "GET one server error" })
    }
})

/*  
    Return all users
    GET: /api/users/
    ( public )
*/
router.get('/', async (req, res) => {
    try {
        // check that the requested collection exists in mongoDB
        const users = await User.find({})
        if (users) {
            // if the collection exists in mongoDB, return all its documents in response
            res.status(200).json(users)
        } else {
            // if no matching collection is found in mongoDB, throw error
            res.status(404).json({ message: "No users found" })
        }
    } catch (err) {
        res.status(500).json({ message: "GET all server error" })
    }
})

module.exports = router