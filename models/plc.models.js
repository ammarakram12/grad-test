const mongoose = require("mongoose");
const plcSchema = mongoose.Schema({
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
module.exports = mongoose.model("plc", plcSchema)