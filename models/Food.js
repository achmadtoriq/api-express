const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require('./Category');

// Definisikan model untuk makanan
const Food = sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Relasi antara makanan dan kategori
Food.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Food, { foreignKey: 'categoryId', as: 'foods' });

module.exports = Food;