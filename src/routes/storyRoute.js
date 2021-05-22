const express = require('express')
const router = express.Router()
const Story = require('../models/Story')
const Donor = require('../models/Donor')
const isLoggedIn = require('../middleware')
// const story = require('../data/storyData')


router.get('/', (req, res) => {
    Story.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})

router.get('/mystory', isLoggedIn, (req, res) => {
    Story.findOne({donorId: req.body.id}).populate('donorId',['name', 'email','avatar','bloodGroup','cityState','mobile']).then((data) => {
        console.log(data)
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })

})

router.get('/storyById/:styId', (req, res) => {
    Story.findOne({_id: req.params.styId}).populate('donorId',['name', 'email','avatar','bloodGroup','cityState','mobile']).then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "wrong story id!"
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

router.post('/createstory',isLoggedIn, (req, res) => {
    Story.findOne({donorId: req.body.id}).then((data) => {
        if(data){
            res.send({
                message: "You have already added the story!"
            })
        } else {
            const story = new Story({
                donorId: req.body.id,
                storyData: req.body.storyData
            })    
            story.save().then((data) => {
                res.send({
                    message: "Story added successfully!",
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

router.delete('/deletestory', isLoggedIn, (req, res) => {
    Story.remove({donorId: req.body.id}).then((data) => {
        res.send({
            message: "story deleted successfully! "
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