const express = require('express')
const story = require('../data/storyData')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(story)
})

router.post('/createstory', (req, res) => {
    story.push(req.body)
    res.send({
        message: "story successfully added! "
    })
})

router.delete('/deletestory', (req, res) => {
    story.map((traceStory, i) => {
        if(req.body.id === traceStory.id)
        {
            story.splice(i, 1)
            res.send({
                message: "story deleted successfully! "
            })
        }
    })
    res.send({
        message: "No story found to delete! "
    })
})

module.exports = router