const express = require('express')
const user = require('../data/userData')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(user)
})

router.post('/createuser', (req, res) => {
    user.map((traceUser) =>{
        if(traceUser.email === req.body.email)
            res.send({
                message: "Donor Account Already Exists!"
            })
    })
    user.push(req.body)
    res.send({
        message: "Donor Account added successfully!"
    })
})

router.delete('/deleteuser', (req, res) => {
    user.map((traceUser,i) => {
        if(req.body.email === traceUser.email){
            user.splice(i, 1); 
            res.send({
                message: "User deleted successfully!"
            })
        }
            
    })
    res.send({
        message: "User not found to delete!"
    })

})

module.exports = router