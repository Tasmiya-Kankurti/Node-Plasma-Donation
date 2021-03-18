const express = require('express');
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/').jwtSecret
const { find } = require('../models/User')

router.get('/',(req, res) => {
    User.findOne({email: req.body.email, password: req.body.password}).then((data) => {
            if(data) {
                // console.log(data._doc)
                const accessToken = jwt.sign({
                    data: {
                        email: req.body.email
                    }
                }, jwtSecret) 
                res.send({
                    accessToken,
                    ...data._doc
                })
            } else {
                res.send({
                    message: "Wrong email and password"
                })
            }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

module.exports = router