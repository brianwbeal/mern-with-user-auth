const mongoose = require('mongoose')

/* User schema */
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    displayName: { type: String, required: true, index: { unique: true } }
})

/* User model */
const User = mongoose.model('User', userSchema)

module.exports = User