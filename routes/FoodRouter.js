const express = require("express");
const { getFoodList } = require("../controller/FoodController");
const router = express.Router();

router.get("/", getFoodList);

module.exports = router;
