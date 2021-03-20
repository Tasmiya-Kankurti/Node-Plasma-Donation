const express = require('express')
const isLoggedIn = require('../middleware')
// const user = require('../data/userData')
const User = require('../models/User') 
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    User.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.post('/createuser', (req, res) => {
    User.findOne({email: req.body.email}).then((data) => {
        if(data){
            res.send({
                message: "Donor Account already exits from this email! "
       
            })
        } else{
            bcrypt.genSalt(10).then((salt) => {
                return bcrypt.hash(req.body.password, salt)
            }).then((hash) => {
                const user = new User({
                    password: hash,
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    age: req.body.age,
                    weight: req.body.weight,
                    bloodGroup: req.body.bloodGroup,
                    address:{
                        country: req.body.address.country,
                        area: req.body.address.area,	
                        city: req.body.address.city,	
                        state: req.body.address.state,	
                        pincode: req.body.address.pincode,
                    },
                    gender: req.body.gender,
                    child: req.body.child,
                    reportsDates:{
                        first: req.body. reportsDates.first,
                        second: req.body. reportsDates.second
                    }
                })

                return user.save()
            }).then((data) => {
                res.send({
                    message: "Donor Account created succesfully! ",
                    ...data._doc
                })
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })    

    }

    })
    
})

router.delete('/deleteuser', isLoggedIn, (req, res) => {
    User.remove({email: req.body.email}).then((data) => {
        res.send({
            message: "Donor Account deleted succesfully! "
        })
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.put('/updateuser', isLoggedIn, (req,res) => {
    User.updateOne(
        {
            email: req.body.email
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data)=>{
        User.findOne({email: req.body.email}).then((data) => {
            if(data !== null)
                res.send(data)
            else{
                res.send({
                    message: "User not found !"
                })
            }
    })
    }).catch((error)=>{
        res.send({
            message: error.message,
        })
    })
})

router.put('/forgetpassword', (req, res) => {
    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(req.body.password, salt)
    }).then((hash) => {
        User.updateOne(
            {
                email: req.body.email
            },
            {
                $set: {
                    password: hash
                }
            }
        ).then((data) => {
            res.send({
                message: "Password Updated"
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })
        })
    }).catch((error) => {
        message: error.message
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