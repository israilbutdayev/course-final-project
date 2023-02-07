import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const usersModel = sequelize.define(
  "users",
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default usersModel;
