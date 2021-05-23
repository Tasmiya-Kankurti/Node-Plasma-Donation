const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Donor = require('../models/Donor')
const isLoggedIn = require('../middleware')
// const post = require('../data/postData')


router.get('/', (req, res) => {
    Post.find().populate('donorId',['name', 'email','avatar','bloodGroup','address','mobile', 'reportsDates']).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})


router.get('/mypost', isLoggedIn, (req, res) => {
    Post.findOne({donorId: req.body.id}).populate('donorId',['name', 'email','avatar','bloodGroup','address','mobile','reportsDates']).then((data) => {
        if(data){
             // console.log(data)
        res.send(data)
        } else {
            res.status(404).send({
                error: {
                    message: "You have not posted yet!"
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

router.get('/postById/:posId', (req, res) => {
    Post.findOne({_id: req.params.posId}).populate('donorId',['name', 'email','avatar','bloodGroup','address','mobile','reportsDates']).then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "Wrong posId!"
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

router.post('/createpost',isLoggedIn, (req, res) => {
    Post.findOne({donorId: req.body.id}).then((data) => {
        // console.log(data)
        if(data){
            res.send({
                message: "You have already posted!"
            })
        } else {
            const post = new Post({
                donorId: req.body.id
            })
             
            post.save().then((data) => {
                Donor.updateOne(
                    {
                        _id: req.body.id
                    },
                    {
                        $set: {
                            isDonor: true
                        }
                    }
                ).then((ddata)=>{
                            res.send({
                                message: "Post added successfully!",
                                ...data._doc
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
        }
        
    })
})

router.delete('/deletepost', isLoggedIn, (req, res) => {
    Post.remove({donorId: req.body.id}).then((data) => {
        if(data.deletedCount === 0){
            res.status(401).send({
                error: {
                    message: "Wrong user Id! "
                }
            })
        } else {
            Donor.updateOne(
                {
                    _id: req.body.id
                },
                {
                    $set: {
                        isDonor: false
                    }
                }
            ).then((ddata)=>{
                        res.send({
                            message: "Post deleted successfully!",
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
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

// router.get('/', (req, res) => {
//     res.send(post)
// })

// router.post('/createpost', (req, res) => {
//     post.map((tracePost) => {
//         if(req.body.email === tracePost.email)
//             res.send({
//                 message: " You have already posted! "
//             })
//     })
//     post.push(req.body)
//     res.send({
//         message: "Post added successfully!"
//     })
// })

// router.delete('/deletepost', (req, res) => {
//     post.map((tracePost,i) => {
//         if(req.body.email === tracePost.email){
//             post.splice(i, 1); 
//             res.send({
//                 message: "Post deleted successfully!"
//             })
//         }
            
//     })
//     res.send({
//         message: "Post not found to delete!"
//     })

// })


module.exports = router