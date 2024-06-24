const express = require("express");
const plcController = require("../controller/plc.controller.js");
const router = express.Router();


router.route("/")
    .post(plcController.addtData)


module.exports = router;