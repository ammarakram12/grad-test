const mongoose = require("mongoose")
const aiSchema = new mongoose.Schema({

    data: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    machineid: {
        type: String,
        require: true
    }
})
exports = mongoose.model("ai", aiSchema)