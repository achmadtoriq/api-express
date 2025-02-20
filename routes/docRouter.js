const express = require("express")
const router = express.Router();

const { swaggerUi, swaggerSpecs} = require('../controller/docsController')

router.use("/", (req, res, next) => {
    console.log('Swagger UI endpoint accessed');
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = router;