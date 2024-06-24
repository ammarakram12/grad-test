require("dotenv").config()
const express = require("express");
const app = express();
const httpStatusText = require("./utils/httpStatusText.js")
const cors = require("cors")

//database
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(() => {
        console.log("connected to db")
    })
    .catch(err => {
        console.error('Failed to connect to the database', err);
    });
//const sensordb = require("./models/sensor.model.js")

//medile ware
app.use(express.json());
app.use(cors())
app.use((error, req, res, next) => {
    res.json({ status: httpStatusText.ERROR, message: error.message });
})
//sensor
const sensorController = require("./controller/sensor.controller.js")
const sensorRouter = require("./routes/sensor.routes.js")
app.use("/api/sensor", sensorRouter);
//sensor reading
// const sensorReadingController = require("./controller/sensorReading.controller.js")
// const sensorReadingRouter = require("./routes/sensorReading.routes.js")
// app.use("/api/sensor/readings", sensorReadingRouter);
//factory
const factoryController = require("./controller/factory.controller.js")
const factoryRouter = require("./routes/factory.routes.js")
app.use("/factory", factoryRouter);
//assets
const assetsController = require("./controller/asset.controller.js");
const assetRouter = require("./routes/asset.routes.js");
app.use("/assets", assetRouter)

//PLC
const plcController = require("./controller/plc.controller.js")
const plcRouter = require("./routes/plc.routes.js")
app.use("/api/plc", plcRouter)

//AI
const aiController = require("./controller/ai.controller.js")
const aiRouter = require("./routes/ai.routes.js")
app.use("/api/ai", aiRouter)


//user
const userRouter = require("./routes/user.routes.js");
const usercontroller = require("./controller/user.controller.js")
app.use("/user", userRouter)





app.all("*", (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, data: null, message: err.message, code: 400 })
})


app.listen(process.env.PORT, () => {

    console.log("server is running on port 7000")
});





