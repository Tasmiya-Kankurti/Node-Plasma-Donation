const express = require('express')
const post = require('../data/postData')
const { push } = require('../data/requestData')
const request = require('../data/requestData')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(request)
})

router.get('/search', (req, res) => {
    var postsArray = []
    var flag = 0
    post.map((tracePost) => {
        if(req.body.bloodGroup === tracePost.bloodGroup)
        {
            flag = 1
            postsArray.push(tracePost)
        }
    })
    if(flag === 1)
        res.send(postsArray)
    res.send({
        message: "Sorry we dont have the required plasma donor.. You can add a request "
    })

})

router.post('/createrequest', (req, res) => {
    request.push(req.body)
    res.send({
        message: "Request added successfully! "
    })
})

router.delete('/deleterequest', (req, res) => {
    request.map((traceRequest,i) => {
        if(req.body.email === traceRequest.email){
            request.splice(i, 1); 
            res.send({
                message: "Request deleted successfully!"
            })
        }
            
    })
    res.send({
        message: "Request not found to delete!"
    })

})
module.exports = router