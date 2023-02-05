const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const usersModel = sequelize.define(
  "users",
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    // timestamps: false,
    sync: { alter: true },
    freezeTableName: true,
  }
);
module.exports = usersModel;
