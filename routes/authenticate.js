// routes/api.js
const express = require("express")
const requestValidate = require("../middleware/requestValidation")
const { loginSchema, registerSchema } = require("../schema/requestSchema");
const registerController = require("../controller/registerController");
const loginController = require("../controller/loginController");
const router = express.Router();

router.post("/login", requestValidate(loginSchema), loginController);
router.post("/register", requestValidate(registerSchema), registerController);

module.exports = router;
