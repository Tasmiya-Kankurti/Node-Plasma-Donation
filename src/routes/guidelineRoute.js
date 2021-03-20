const express = require('express')
const router = express.Router()
const Guideline = require('../models/Guidelines')


router.post('/createguideline', (req, res) => {
    const guideline = new Guideline({
        data: req.body.data
    })
    guideline.save().then((data) => {
        res.send({
            message: "Guidlines added successfully!"
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

router.get('/',(req,res) => {
   Guideline.findOne().then((data) => {
       if(data)
        res.send({
            message: data
        })
   })
})

router.put('/updateguideline',(req,res) => {
    Guideline.updateOne(
        {

        },
        {
            $set: {
                data: req.body.data
            }
        }
    ).then((data) => {
        res.send({
            message: "Guidelines updated successfully!"
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
   
})

module.exports = router