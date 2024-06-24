const { set } = require("mongoose");
const sensordb = require("../models/sensor.model.js")
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");

const getAllSensors = async (req, res) => {
    const query = req.query
    const limit = query.limit || 3
    const page = query.page || 1;
    const skip = (page - 1) * limit
    const sensor = await sensordb.find({}, { "__v": false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { sensor } })
}

const getSingleSensor =
    async (req, res) => {
        const sensor = await sensordb.findById(req.params.sensorid)
        if (!sensor) {
            return res.status(404).json({ status: httpStatusText.FAIL, data: { sensor: "sensor not found" } })
        }
        return res.json({ status: httpStatusText.SUCCESS, data: { sensor } });
    }

const addSensor = async (req, res) => {
    const sensor = new sensordb(req.body)
    await sensor.save();
    res.json({ status: httpStatusText.SUCCESS, data: { sensor } })

}

const updateSensor = async (req, res) => {
    const sensor = await sensordb.findByIdAndUpdate(req.params.sensorid, { $set: { ...req.body } }, { new: true })
    res.json({ status: httpStatusText.SUCCESS, data: { sensor } })
}
const deleteSensor = async (req, res) => {
    const sensor = await sensordb.deleteOne({ _id: req.params.sensorid })
    res.json({ status: httpStatusText.SUCCESS, data: null })
}

module.exports = {
    getSingleSensor,
    addSensor,
    updateSensor,
    deleteSensor,
    getAllSensors

}