const { set } = require("mongoose");
const plcdb = require("../models/plc.models.js")
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");

const addtData = async (req, res) => {
    const plc = new plcdb(req.body)
    await plc.save()
    res.json({ status: httpStatusText.SUCCESS, data: { plc } })
}


module.exports = {
    addtData
}
