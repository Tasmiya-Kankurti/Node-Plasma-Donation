const express = require('express')
// const post = require('../data/postData')
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.post('/createpost',isLoggedIn, (req, res) => {
    Post.find({email: req.body.email}).then((data) => {
        if(data.length !== 0){
            res.send({
                message: "You have already posted!  "
       
            })
        } else{
            const post = new Post({
                name: req.body.name,
                email: req.body.email,
                bloodGroup: req.body.bloodGroup,
                mobile: req.body.mobile,
            })
        
            post.save().then((data) => {
                res.send({
                    message: "Post added successfully!",
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

router.delete('/deletepost', isLoggedIn, (req, res) => {
    Post.remove({email: req.body.email}).then((data) => {
        res.send({
            message: "Post deleted successfully! "
        })
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.put('/updatepost', isLoggedIn, (req,res) => {
    Post.updateOne(
        {
            email: req.body.email
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data)=>{
        Post.find({email: req.body.email}).then((data) => {
            if(data.length !== 0)
                res.send(data)
    })
    }).catch((error)=>{
        res.send({
            message: error.message,
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