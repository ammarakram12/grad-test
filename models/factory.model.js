const mongoose = require("mongoose")
const User = require("../models/user.models.js")
const factorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }

})

module.exports = mongoose.model("factory", factorySchema)


