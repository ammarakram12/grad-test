const express = require("express");
const assetsController = require("../controller/asset.controller.js");
//const { route } = require("./sensor.routes.js");
const router = express.Router();



router.route("/")
    .get(assetsController.getAllAsset)
    .post(assetsController.addAsset)
    .delete(assetsController.deleteAll)


router.route("/:assetid")
    .get(assetsController.getOneAsset)
    .patch(assetsController.UpdateAsset)
    .delete(assetsController.deleteAsset)



module.exports = router;