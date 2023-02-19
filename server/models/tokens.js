import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import usersModel from "./users.js";

const tokensModel = sequelize.define(
  "tokens",
  {
    refresh_token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
tokensModel.belongsTo(usersModel);

await tokensModel.sync();

export default tokensModel;
