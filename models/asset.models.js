const mongoose = require("mongoose")
const assetsSchema = new mongoose.Schema({
    typeofPlastic: {
        type: String,
        require: true

    },
    quantity: {
        type: Number,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    order: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})



module.exports = mongoose.model("asset", assetsSchema)


