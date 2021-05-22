const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: "donor"
    },

    storyData: {
        type: String,
        required: true
    }
})

const story = mongoose.model("story", storySchema)

module.exports = story