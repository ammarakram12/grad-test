
const express = require("express")
const router = express.Router();
const sensorController = require("../controller/sensor.controller.js")



router.route("/")
    .get(sensorController.getAllSensors)
    .post(sensorController.addSensor)

router.route("/:sensorid")
    .get(sensorController.getSingleSensor)
    .patch(sensorController.updateSensor)
    .delete(sensorController.deleteSensor)

module.exports = router;




