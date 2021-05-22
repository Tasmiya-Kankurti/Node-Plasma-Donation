const express = require('express')
const router = express.Router()
const Receiver = require('../models/Receiver')
const Request = require('../models/Request')
const isLoggedIn = require('../middleware')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const normalize = require('normalize-url')

router.get('/', (req, res) => {
    Receiver.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.get('/myaccount', isLoggedIn, (req, res) => {
    Receiver.findOne({_id: req.body.id}).select('-password').then((data) => {
        // console.log(data)
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })

})

router.get('/receiverById/:receiverId', (req, res) => {
    Receiver.findOne({_id: req.params.receiverId}).select('name email avatar mobile bloodGroup cityState reportsDates').then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "No receiver  available of this receiver-id!"
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

router.post('/createreceiver', (req, res) => {
    Receiver.findOne({email: req.body.email}).then((data) => {
        if(data){
            res.status(403).send({
                error: {
                    message: "Receiver account already exists from this email!"
                }
            })
        } else{
            const avatar = normalize(
                gravatar.url(req.body.email, {
                  s: '200',
                  r: 'pg',
                  d: 'mm'
                }),
                { forceHttps: true }
              );

            bcrypt.genSalt(10).then((salt) => {
                return bcrypt.hash(req.body.password, salt)
            }).then((hash) => {
                const receiver = new Receiver({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    avatar: avatar,
                    mobile: req.body.mobile,
                    patientBG: req.body.patientBG,
                    address:{
                        area: req.body.area,
                        city: req.body.city,
                        state:req.body.state,
                        pincode: req.body.pincode
                    }
                })
                return receiver.save()
            }).then((data) => {
                res.send({
                    message: "Receiver Account created succesfully! ",
                    ...data._doc
                })
            }).catch((error) => {
                res.status(500).send({
                    error: {
                        message: error.message
                    }
                })
            })    
        }

    })
})

router.put('/updatereceiver', isLoggedIn, (req,res) => {
    Receiver.updateOne(
        {
            _id: req.body.id
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data)=>{
        Receiver.findOne({_id: req.body.id}).then((data) => {
            if(data !== null)
                res.send({
                    message: "Receiver details updated successfully!",
                    ...data._doc
                })
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }     
        })
    })
    }).catch((error)=>{
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.put('/forgetpassword', (req, res) => {
    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(req.body.password, salt)
    }).then((hash) => {
        Receiver.updateOne(
            {
                _id: req.body.userId
            },
            {
                $set: {
                    password: hash
                }
            }
        ).then((data) => {
            res.send({
                message: "Password Updated successfully!"
            })
        }).catch((error) => {
            res.status(500).send({
                error: {
                    message: error.message
                }
            })
        })
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    }) 
})

router.delete('/deletereceiver', isLoggedIn, (req, res) => {
    Receiver.remove({_id: req.body.id}).then((data) => {
        Request.remove({receiverId: req.body.id}).then((pdata) => {
            res.send({
                message: "Receiver Account deleted succesfully! "
            })
        }).catch((error) => {
            res.status(500).send({
                error: {
                    message: error.message
                }
            })
        })  
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

module.exports = router