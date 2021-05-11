const mongoose = require('mongoose')

/* Item schema */
const itemSchema = new mongoose.Schema({
    title: { type: String, reuqired: true, index: { unique: true } },
    bodyContent: { type: String, required: true }
})

/* Item model */
const Item = mongoose.model('Item', itemSchema)

module.exports = Item