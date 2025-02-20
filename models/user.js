const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt"); // Pastikan Anda sudah menginstal package bcrypt
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

// Hook 'beforeCreate' untuk hashing password sebelum disimpan di database
User.beforeCreate(async (user) => {
  const saltRounds = 10; // Jumlah salt rounds, bisa disesuaikan
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

// Metode instance untuk membandingkan password yang di-hash
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
