const mongoose = require("mongoose")
const validator = require("validator")
const { validate } = require("./sensor.model")
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [validator.isEmail, "failled must be email address"]


    },
    password: {
        type: String,
        require: true,
        validate: [validator.isEmail, "filled must be email address"]


    },
    token: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("user", userSchema)