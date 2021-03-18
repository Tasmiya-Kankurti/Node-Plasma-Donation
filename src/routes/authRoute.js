const express = require('express');
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret = require('../../config/').jwtSecret
const { find } = require('../models/User')

router.get('/',(req, res) => {
    User.findOne({email: req.body.email}).then((data) => {
            if(data) {
                bcrypt.compare(req.body.password, data._doc.password).then((result) => {
                    if(result){
                        delete data._doc.password
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
                            message: "Wrong password"
                        })
                    }
                }).catch((error) => {
                    res.send({
                        message: error.message
                    })
                })
                
            } else {
                res.send({
                    message: "Wrong email"
                })
            }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

module.exports = router