import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const tokensModel = sequelize.define(
  "tokens",
  {
    refresh_token: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default tokensModel;
