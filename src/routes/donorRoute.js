const express = require('express')
const router = express.Router()
const Donor = require('../models/Donor')
const Post = require('../models/Post')
const Story = require('../models/Story')
const isLoggedIn = require('../middleware')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const normalize = require('normalize-url')
// const user = require('../data/userData')

router.get('/', (req, res) => {
    Donor.find().then((data) => {
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
    Donor.findOne({_id: req.body.id}).select('-password').then((data) => {
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

router.get('/donorbyid/:donorId', (req, res) => {
    Donor.findOne({_id: req.params.donorId}).select('name email mobile bloodGroup cityState reportsDates').then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "No donor  available of this donor-id!"
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

router.post('/createdonor', (req, res) => {
    Donor.findOne({email: req.body.email}).then((data) => {
        if(data){
            res.status(403).send({
                error: {
                    message: "Donor account already exists from this email!"
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
                const donor = new Donor({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    avatar: avatar,
                    mobile: req.body.mobile,
                    age: req.body.age,
                    weight: req.body.weight,
                    bloodGroup: req.body.bloodGroup,
                    address:{
                        area: req.body.area,
                        city: req.body.city,
                        state:req.body.state,
                        pincode: req.body.pincode
                    },
                    gender: req.body.gender,
                    haveChild: req.body.haveChild,
                    reportsDates:{
                        first: req.body.reportsDates.first,
                        second: req.body.reportsDates.second
                    }
                })

                return donor.save()
            }).then((data) => {
                res.send({
                    message: "Donor Account created succesfully! ",
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


router.put('/updatedonor', isLoggedIn, (req,res) => {
    Donor.updateOne(
        {
            _id: req.body.id
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data)=>{
        Donor.findOne({_id: req.body.id}).then((data) => {
            if(data !== null)
                res.send({
                    message: "Donor details updated successfully!",
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
        Donor.updateOne(
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

router.delete('/deletedonor', isLoggedIn, (req, res) => {
    Donor.remove({_id: req.body.id}).then((data) => {
        Post.remove({donorId: req.body.id}).then((pdata) => {
            Story.remove({donorId: req.body.id}).then((sdata) => {
                if(data.deletedCount === 0){
                    res.status(401).send({
                        error: {
                            message: "Wrong user Id! "
                        }
                    })
                } else {
                    res.send({
                        message: "Donor account deleted successfully!"
                    })
                }
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
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

// router.get('/', (req, res) => {
//     res.send(user)
// })

// router.post('/createuser', (req, res) => {
//     user.map((traceUser) =>{
//         if(traceUser.email === req.body.email)
//             res.send({
//                 message: "Donor Account Already Exists!"
//             })
//     })
//     user.push(req.body)
//     res.send({
//         message: "Donor Account added successfully!"
//     })
// })

// router.delete('/deleteuser', (req, res) => {
//     user.map((traceUser,i) => {
//         if(req.body.email === traceUser.email){
//             user.splice(i, 1); 
//             res.send({
//                 message: "User deleted successfully!"
//             })
//         }
            
//     })
//     res.send({
//         message: "User not found to delete!"
//     })

// })

module.exports = router