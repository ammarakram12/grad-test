const { set } = require("mongoose");
const aidb = require("../models/ai.models.js");
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");
const plcdb = require("../models/plc.models.js")

const getAllData = async (req, res) => {
    const plc = await plcdb.find()
    res.json({ status: httpStatusText.SUCCESS, data: { plc } })
}

const addData = async (req, res) => {
    try {
        const ai = new aidb(req.body);
        await ai.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { ai } });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
};

module.exports = {
    getAllData,
    addData
};




