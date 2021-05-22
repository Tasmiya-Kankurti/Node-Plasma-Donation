const mongoose = require("mongoose")
const Schema = mongoose.Schema

const requestSchema = new Schema({
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "receiver"
    }
})

const request = mongoose.model("request", requestSchema)
module.exports = request