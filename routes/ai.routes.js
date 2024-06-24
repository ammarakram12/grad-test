const express = require("express");
const aiController = require("../controller/ai.controller.js");
//const { route } = require("./sensor.routes.js");
const router = express.Router();


router.route("/")
    .get(aiController.getAllData)
    .post(aiController.addData)


module.exports = router;
