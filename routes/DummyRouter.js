const express = require("express");
const router = express.Router();

const categoryData = require("../data/food.json");
const foodData = require("../data/food.json");
const Food = require("../models/Food");
const logger = require("../config/logger");
const Category = require("../models/Category");

router.use("/food", async (req, res) => {
  try {
    const dd = await Food.bulkCreate(foodData);        
    res.status(200).send("Sukses Create");
  } catch (error) {
    logger.info(`Error: ${error}`, {reqId: 'Dummy Data'})
    res.status(400).send("Gagal Create Data");
  }
});

router.use("/category", async (req, res) => {
    try {
      await Category.bulkCreate(categoryData);
      res.status(200).send("Sukses Create");
    } catch (error) {
      logger.info(`Error: ${error}`, {reqId: 'Dummy Data'})
      res.status(400).send("Gagal Create Data");
    }
  });

module.exports = router;
