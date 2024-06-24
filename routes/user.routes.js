const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/user.controller.js")
const verifyToken = require("../meddleware/verifyToken.js")


router.route("/")
    .get(verifyToken, usercontroller.getAllUser)


router.route("/register")
    .post(usercontroller.register)

router.route("/login")
    .get(usercontroller.loginWithToken)

module.exports = router;

