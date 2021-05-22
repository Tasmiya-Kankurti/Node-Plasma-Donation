const express = require('express')
const router = express.Router()
const Guideline = require('../models/Guidelines')


router.post('/createguideline', (req, res) => {
    const guideline = new Guideline({
        info: req.body.info
    })
    guideline.save().then((data) => {
        res.send({
            message: "Guidlines added successfully!"
        })
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.get('/',(req,res) => {
   Guideline.findOne().then((data) => {
       if(data){
        res.send({
            message: data
        })   
       } else {
        res.send({
            message: "Guidelines are not added yet!"
        })
       }
   })
})

router.put('/updateguideline',(req,res) => {
    Guideline.updateOne(
        {

        },
        {
            $set: {
                info: req.body.info
            }
        }
    ).then((data) => {
        res.send({
            message: "Guidelines updated successfully!",
            ...data._doc
        })
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
   
})

module.exports = router