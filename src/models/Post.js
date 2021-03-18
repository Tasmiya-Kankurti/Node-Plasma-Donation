const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodGroup:  {
        type: String,
        required: true
    },
    mobile:  {
        type: Number,
        required: true
    }
   
})

const post = mongoose.model("post", postSchema)

module.exports = post