const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definisikan model untuk kategori
const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Category;
