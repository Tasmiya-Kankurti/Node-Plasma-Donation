const mongoose = require("mongoose")

const Schema = mongoose.Schema

const requestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
})

const request = mongoose.model("request", requestSchema)

module.exports = request