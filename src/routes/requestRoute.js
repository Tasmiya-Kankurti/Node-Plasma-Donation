const express = require('express')
// const post = require('../data/postData')
// const { push } = require('../data/requestData')
// const request = require('../data/requestData')
const Request = require("../models/Request")
const Post = require('../models/Post')
const router = express.Router()

router.get('/', (req, res) => {
    Request.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.get('/search', (req,res) => {
    Post.find({bloodGroup: req.body.bloodGroup}).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send({
            message: "Sorry we dont have the required plasma donor.. You can add a request" 
        })
    })

})

router.post('/createrequest', (req, res) => {

    const request = new Request({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        bloodGroup: req.body.bloodGroup,
    })

    request.save().then((data) => {
        res.send({
            message: "Request added successfully! ",
            ...data._doc
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })

    router.delete('/deleterequest', (req, res) => {
        Request.remove({email: req.body.email}).then((data) => {
            res.send({
                message: "Request deleted successfully! "
            })
        }).catch((error) => {
            res.send({
                message: error.message,
            })
        })
    })
    
    router.put('/updaterequest', (req,res) => {
        Request.updateOne(
            {
                email: req.body.email
            },
            {
                $set: {
                    ...req.body
                }
            }
        ).then((data)=>{
            Request.find({email: req.body.email}).then((data) => {
                if(data.length !== 0)
                    res.send(data)
        })
        }).catch((error)=>{
            res.send({
                message: error.message,
            })
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