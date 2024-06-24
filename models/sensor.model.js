const mongoose = require("mongoose")

const sensorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("sensor", sensorSchema)
