const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiverSchema = new Schema({
    isReceiver:{
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true
    },

    patientBG: {
        type: String,
        required: true
    },

    address:{
        area: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    }

})

const receiver = mongoose.model("receiver", receiverSchema)
module.exports = receiver