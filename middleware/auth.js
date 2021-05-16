const jwt = require('jsonwebtoken')

/* auth middleware function */
const auth = async (req, res, next) => {
    try {
        // check that request has auth header
        const token = req.headers.jwt

        if (token) {
            // verify the token
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if (verified) {
                // if the token is valid, call next to continue route handler function
                console.log(`user verified with token`)
                next()
            } else {
                // if token is not valid, throw error
                res.status(401).json({ message: "unauthorized request: token is invalid" })
            }
        } else {
            // if no token present in request header, throw error
            res.status(401).json({ message: "unauthorized request: no token present" })
        }
    } catch (err) {
        res.status(500).json({ message: "authentication error: 500" })
    }
}

module.exports = auth