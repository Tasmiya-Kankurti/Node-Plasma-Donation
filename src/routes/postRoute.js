const express = require('express')
const post = require('../data/postData')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(post)
})

router.post('/createpost', (req, res) => {
    post.map((tracePost) => {
        if(req.body.email === tracePost.email)
            res.send({
                message: " You have already posted! "
            })
    })
    post.push(req.body)
    res.send({
        message: "Post added successfully!"
    })
})

router.delete('/deletepost', (req, res) => {
    post.map((tracePost,i) => {
        if(req.body.email === tracePost.email){
            post.splice(i, 1); 
            res.send({
                message: "Post deleted successfully!"
            })
        }
            
    })
    res.send({
        message: "Post not found to delete!"
    })

})


module.exports = router