const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guidelinesSchema = new Schema({
    data: {
        type: String,
        required: true
    }
   
})

const guidelines = mongoose.model("guideline", guidelinesSchema)

module.exports = guidelines