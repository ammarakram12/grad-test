const { set } = require("mongoose")
const userdb = require("../models/user.models.js")
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');




const getAllUser = async (req, res) => {
    const query = req.query
    const limit = query.limit
    const page = query.page
    const skip = (page - 1) * limit
    const user = await userdb.find({}, { "__v": false, "pasword": false }).limit(limit).skip(skip)
    res.json({ status: httpStatusText.SUCCESS, data: { user } })
}

const register = async (req, res) => {
    const { firstname, lastname, email, pasword } = req.body;
    const oldUser = await userdb.findOne({ email: email })
    if (oldUser) {
        return res.json({ status: httpStatusText.FAIL, data: { user: "email already resgistered" } });

    }
    const hashedpPassword = await bcrypt.hash(pasword, 10)



    const newUser = new userdb({
        firstname,
        lastname,
        email,
        pasword: hashedpPassword
    })


    await newUser.save()

    res.json({ status: httpStatusText.SUCCESS, data: { user: newUser } })


}


const loginWithToken = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: httpStatusText.FAIL, message: "Email and password are required." });
    }

    try {
        const user = await userdb.findOne({ email });
        if (!user) {
            return res.json({ status: httpStatusText.FAIL, message: "User does not exist." });
        }



        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: httpStatusText.FAIL, message: "Incorrect password." });
        }

        // User authenticated, create a token.
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            process.env.JwT_SECRET, // Replace 'yourSecretKey' with your actual secret key
            { expiresIn: '8h' } // Token expiration time
        );

        res.json({ status: httpStatusText.SUCCESS, data: { user: user, token: token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: httpStatusText.ERROR, message: "Server error" });
    }
};



module.exports = {
    getAllUser,
    register,
    loginWithToken
}

