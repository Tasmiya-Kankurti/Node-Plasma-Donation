const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret = require('../../config/').jwtSecret
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')

router.post('/donorlogin',(req, res) => {
    Donor.findOne({email: req.body.email}).then((data) => {
            if(data) {
                bcrypt.compare(req.body.password, data._doc.password).then((result) => {
                    if(result){
                        delete data._doc.password
                        const accessToken = jwt.sign({
                            data: {
                                _id: data._id,
                                userType: "Donor"
                            }
                        }, jwtSecret) 
                        res.send({
                            accessToken,
                            userType: "Donor",
                            ...data._doc
                        })

                    } else {
                        res.status(401).send({
                            error:{
                                message: "Wrong email and password!"
                            }
                        })
                    }
                }).catch((error) => {
                    res.status(500).send({
                        error: {
                            message: error.message
                        }
                    })
                })
                
            } else {
                res.status(401).send({
                    error:{
                        message: "Wrong email and password!"
                    }
                })
            }
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.post('/receiverlogin',(req, res) => {
    Receiver.findOne({email: req.body.email}).then((data) => {
            if(data) {
                bcrypt.compare(req.body.password, data._doc.password).then((result) => {
                    if(result){
                        delete data._doc.password
                        const accessToken = jwt.sign({
                            data: {
                                _id: data._id,
                                userType: "Receiver"
                            }
                        }, jwtSecret) 
                        res.send({
                            accessToken,
                            userType: "Receiver",
                            ...data._doc
                        })

                    } else {
                        res.status(401).send({
                            error:{
                                message: "Wrong email and password!"
                            }
                        })
                    }
                }).catch((error) => {
                    res.status(500).send({
                        error: {
                            message: error.message
                        }
                    })
                })
                
            } else {
                res.status(401).send({
                    error:{
                        message: "Wrong email and password!"
                    }
                })
            }
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})
module.exports = router