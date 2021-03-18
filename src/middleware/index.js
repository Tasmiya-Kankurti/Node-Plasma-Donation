const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/').jwtSecret

const isLoggedIn = (req, res, next) => {

    const token = req.headers['x-access-token']
    if(!token){
        res.send({
            message: "Wrong access token"
        })
    }

    const payload = jwt.verify(token, jwtSecret)
    if(payload.data.email === req.body.email)
    {
       next()
    }
    else{
        res.send({
            message: "Wrong access token "
        })
    }
}

module.exports = isLoggedIn