require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

/* instantiate express app */
const app = express()

/* middleware */
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/* connect to mongoDB */
mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false 
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB Connection Error'))
db.once('open', () => console.log(`successfully connected to MongoDB`))

/* routes */

/* home route */
app.get('/', (req,res) => {
    res.status(200).json({ message: 'app working' })
 });

/* 404 route */
app.use((req, res) => {
    res.status(404).json({
        message: "request returned no result"
    })
});

/* global error handler */
app.use((err, req, res, next) => {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

    res.status(500).json({
        message: err.message,
        error: process.env.NODE_ENV === 'production' ? {} : err,
    });
});

/* start app */
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`now listening on port: ${port}`)
});
