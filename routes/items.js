const express = require('express')
const mongoose = require('mongoose')

/* instantiate express router */
const router = express.Router()

/* Item model */
const Item = require('../models/Item')

/* authentication middleware function */
const auth = require('../middleware/auth')

/* declare handlers for requests to: /api/items */

/*  
    Create new item
    POST: /api/items/ 
    ( auth required )
*/
router.post('/', auth, async (req, res) => {
    try {
        // check request for an item title
        if (req.body.title) {
            // if a title is present, create a new item using the Item model
            const newItem = new Item({
                title: req.body.title,
                bodyContent: req.body.bodyContent
            })
            // save the new instance of the item model
            await newItem.save(() => {
                console.log('new item created')
            })
            res.status(201).json(newItem)
        } else {
            // if there is no item title in request, throw error
            res.status(400).json({ message: "POST: /api/items/ error - A title and body content are required to create a new item" })
        }
    } catch (err) {
        res.status(500).json({ message: "POST item server error" })
    }
})

/*  
    Delete an item
    DELETE: /api/items/:id 
    ( auth required )
*/
router.delete('/:id', auth, async (req, res) => {
    try {
        // check that the requested item exists in mongoDB
        const item = await Item.find({ _id: req.params.id })
        if (item) {
            // if the item exists in mongoDB, delete it
            await Item.deleteOne({ _id: req.params.id })
            res.status(204).end()
        } else {
            // if no item is found in mongoDB, throw error
            res.status(404).json({ message: "DELETE: /api/items/:id error - No matching item found to delete" })
        }
    } catch (err) {
        res.status(500).json({ message: "DELETE item server error" })
    }
})

/*  
    Return an item
    GET: /api/items/:id 
    ( auth required )
*/
router.get('/:id', auth, async (req, res) => {
    try {
        // check that the requested item exists in mongoDB
        const item = await Item.find({ _id: req.params.id })
        if (item) {
            // if the item exists in mongoDB, return it in response
            res.status(200).json(item)
        } else {
            // if no item is found in mongoDB, throw error
            res.status(404).json({ message: "GET: /api/items/:id error - No matching item found" })
        }
    } catch (err) {
        res.status(500).json({ message: "GET one server error" })
    }
})

/*  
    Return all items
    GET: /api/items/
    ( auth required )
*/
router.get('/', auth, async (req, res) => {
    try {
        // check that the requested collection exists in mongoDB
        const items = await Item.find({})
        if (items) {
            // if the collection exists in mongoDB, return all its documents in response
            res.status(200).json(items)
        } else {
            // if no matching collection is found in mongoDB, throw error
            res.status(404).json({ message: "GET: /api/items/ error - No matching items found" })
        }
    } catch (err) {
        res.status(500).json({ message: "GET all server error" })
    }
})

module.exports = router