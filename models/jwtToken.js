const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JwtToken = sequelize.define(
  "jwt_token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    jwt_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

// // Foreign key association (optional if already handled automatically)
// JwtToken.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

module.exports = JwtToken;
