const { set } = require("mongoose");
const assetdb = require("../models/asset.models.js");
const httpStatusText = require("../utils/httpStatusText.js")
const asyncWrapper = require("../meddleware/asyncWrapper.js");


const getAllAsset = async (req, res) => {
    const asset = await assetdb.find()
    res.json({ status: httpStatusText.SUCCESS, data: { asset } })
}


const getOneAsset = async (req, res) => {
    const asset = await assetdb.findById(req.params.assetid)
    if (!asset) {
        return res.status(404).json({ status: httpStatusText.FAIL, data: { asset: "asset not found" } })
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { asset } });
}




const addAsset = async (req, res) => {
    const asset = new assetdb(req.body)
    await asset.save()
    res.json({ status: httpStatusText.SUCCESS, data: { asset } })
}

const UpdateAsset = async (req, res) => {
    const asset = await assetdb.findByIdAndUpdate(req.params.assetid, { $set: { ...req.body } }, { new: true })
    res.json({ status: httpStatusText.SUCCESS, data: { asset } })

}


const deleteAsset = async (req, res) => {
    const asset = await assetdb.deleteOne({ _id: req.params.assetid })
    res.json({ status: httpStatusText.SUCCESS, data: null })

}

const deleteAll = async (req, res) => {
    const asset = await assetdb.deleteMany(_id)
    res.json({ status: httpStatusText.SUCCESS, data: null })
}



module.exports = {
    getAllAsset,
    getOneAsset,
    addAsset,
    UpdateAsset,
    deleteAsset,
    deleteAll
}
