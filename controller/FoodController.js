const logger = require("../config/logger");
const Food = require("../models/Food");

const getFoodList = async(req, res) => {
    try {
        const foods = await Food.findAll({ include: 'category' });
        res.status(200).json(foods);
    } catch (error) {
        logger.error(`Error Controller - ${error}`, { reqId: 'FoodController'})
        res.status(400).json(error.message);
    }
}

module.exports = { getFoodList }