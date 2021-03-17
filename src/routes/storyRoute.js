const express = require('express')
// const story = require('../data/storyData')
// const story = require('../models/storyModel') 
const Story = require('../models/storyModel')
const router = express.Router()

router.get('/', (req, res) => {

    Story.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })

})

router.post('/createstory', (req, res) => {

    const story = new Story({
        name: req.body.name,
        description: req.body.description,
    })

    story.save().then((data) => {
        res.send({
            message: "story successfully added! ",
            ...data._doc
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

router.delete('/deletestory', (req, res) => {
    Story.remove({name: req.body.name}).then((data) => {
        res.send({
            message: "story deleted successfully! "
        })
    }).catch((error) => {
        res.send({
            message: error.message,
        })
    })
})

router.put('/updatestory', (req,res) => {
    Story.updateOne(
        {
            name: req.body.name
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data)=>{
        Story.find({name: req.body.name}).then((data) => {
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
//     res.send(story)
// })

// router.post('/createstory', (req, res) => {
//     story.push(req.body)
//     res.send({
//         message: "story successfully added! "
//     })
// })

// router.delete('/deletestory', (req, res) => {
//     story.map((traceStory, i) => {
//         if(req.body.id === traceStory.id)
//         {
//             story.splice(i, 1)
//             res.send({
//                 message: "story deleted successfully! "
//             })
//         }
//     })
//     res.send({
//         message: "No story found to delete! "
//     })
// })

module.exports = router