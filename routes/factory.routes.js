const express = require("express")
const factoryController = require("../controller/factory.controller.js")
const router = express.Router()







router.route("/")
    .get(factoryController.getAllFactory)
    .post(factoryController.addFactory)





router.route("/:factoryid")
    .get(factoryController.getOneFactory)
    .patch(factoryController.updateFactory)
    .delete(factoryController.deleteFactory)





module.exports = router;
