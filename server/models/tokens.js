const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const usersModel = require("./users");

const tokensModel = sequelize.define(
  "tokens",
  {
    refresh_token: DataTypes.STRING,
  },
  {
    // timestamps: false,
    sync: { alter: true },
    freezeTableName: true,
  }
);

module.exports = tokensModel;
