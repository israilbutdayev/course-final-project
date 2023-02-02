const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const users = sequelize.define(
  "users",
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
  },
  {
    // timestamps: false,
    sync: { alter: true },
    freezeTableName: true,
  }
);
module.exports = users;
