const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    } 
})

const story = mongoose.model("story", storySchema)

module.exports = story