const express = require('express')
const router = express.Router()
const Request = require('../models/Request')
const Donor =require('../models/Donor')
const isLoggedIn = require('../middleware')
// const request = require('../data/requestData')

router.get('/', (req, res) => {
    Request.find().populate('receiverId',['name', 'email','avatar','patientBG','address','mobile']).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.get('/myrequest', isLoggedIn, (req, res) => {
    Request.findOne({receiverId: req.body.id}).populate('receiverId',['name', 'email','avatar','patientBG','address','mobile']).then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
       } else {
           res.status(404).send({
               error: {
                   message: "You have not requested yet!"
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

router.get('/requestbyid/:reqId', (req, res) => {
    Request.findOne({_id: req.params.reqId}).populate('receiverId',['name', 'email','avatar','patientBG','address','mobile']).then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "wrong request id!"
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

router.get('/search/:reqBG', (req,res) => {
    Donor.find({bloodGroup: req.params.reqBG}).then((data)=>{
        if(data){
            res.send(data)
        } else {
            res.send("Sorry we dont have the required plasma donor.. You can add a request")
        }
        
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message   
            }
        })
    })

})

router.post('/createrequest',isLoggedIn, (req, res) => {
    Request.findOne({receiverId: req.body.id}).then((data) => {
        if(data){
            res.send({
                message: "You have already requested for donor!"
            })
        } else {
            const request = new Request({
                receiverId: req.body.id
            })    
            request.save().then((data) => {
                res.send({
                    message: "Request added successfully!",
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

router.delete('/deleterequest', isLoggedIn, (req, res) => {
    Request.remove({receiverId: req.body.id}).then((data) => {
        res.send({
            message: "request deleted successfully! "
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
//     res.send(request)
// })

// router.get('/search', (req, res) => {
//     var postsArray = []
//     var flag = 0
//     post.map((tracePost) => {
//         if(req.body.bloodGroup === tracePost.bloodGroup)
//         {
//             flag = 1
//             postsArray.push(tracePost)
//         }
//     })
//     if(flag === 1)
//         res.send(postsArray)
//     res.send({
//         message: "Sorry we dont have the required plasma donor.. You can add a request "
//     })

// })

// router.post('/createrequest', (req, res) => {
//     request.push(req.body)
//     res.send({
//         message: "Request added successfully! "
//     })
// })

// router.delete('/deleterequest', (req, res) => {
//     request.map((traceRequest,i) => {
//         if(req.body.email === traceRequest.email){
//             request.splice(i, 1); 
//             res.send({
//                 message: "Request deleted successfully!"
//             })
//         }
            
//     })
//     res.send({
//         message: "Request not found to delete!"
//     })

// })
module.exports = router