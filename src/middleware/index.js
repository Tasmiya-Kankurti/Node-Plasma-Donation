const jwt = require('jsonwebtoken')
const jwtSecret = require ('../../config/').jwtSecret

const isLoggedIn = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token){
        res.status(401).send({
            error: {
                message: "Wrong access token!"
            }
        })
    }

    else{
        try {
            const payload = jwt.verify(token, jwtSecret)
            req.body.id = payload.data._id,
            userType = payload.data.userType

            next()
        }
        catch(error) {
            res.status(500).send({
                error: {
                    message: error.message
                }
            })
        }
    }   
}

module.exports = isLoggedIn