const path = require("path");
require("dotenv").config({
  path: path.resolve(
    __dirname,
    `../.env.${process.env.NODE_ENV || "development"}`
  ),
});

const { Sequelize } = require("sequelize");
const logger = require("./logger");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+07:00", // Set zona waktu ke Asia/Jakarta
    logging: (...msg) => {
      return logger.info(msg[0], { reqId: "Database" });
    },
  }
);

module.exports = sequelize;
