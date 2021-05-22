const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: "donor"
    }
})

const post = mongoose.model("post", postSchema)
module.exports = post