const { set } = require("mongoose");
const factorydb = require("../models/factory.model.js")
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");
const user = require("../models/user.models.js")

const getAllFactory = async (req, res) => {
    const query = req.query
    const limit = query.limit
    const page = query.page
    const skip = (page - 1) * limit
    const factory = await factorydb.find({}, { "__v": false }).limit(limit).skip(skip)
    res.json({ status: httpStatusText.SUCCESS, data: { factory } })
}

const getOneFactory = async (req, res) => {
    const factory = await factorydb.findById(req.params.factoryid)
    if (!factory) {
        return res.status(404).json({ status: httpStatusText.FAIL, data: { factory: "factory not found" } })
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { factory } });
}

const addFactory = async (req, res) => {
    const factory = new factorydb({ ...req.body, author: user._id }, { "__v": false })
    await factory.save();
    res.json({ status: httpStatusText.SUCCESS, data: { factory } })

}


const updateFactory = async (req, res) => {
    const factory = await factorydb.findByIdAndUpdate(req.params.factoryid, { $set: { ...req.body } }, { new: true })
    res.json({ status: httpStatusText.SUCCESS, data: { factory } })

}

const deleteFactory = async (req, res) => {
    const factory = await factorydb.deleteOne({ _id: req.params.factoryid })
    res.json({ status: httpStatusText.SUCCESS, data: null })
}


module.exports = {
    getAllFactory,
    getOneFactory,
    addFactory,
    updateFactory,
    deleteFactory
}

