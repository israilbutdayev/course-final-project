import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const productsModel = sequelize.define(
  "products",
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    color: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    imageUrls: DataTypes.JSON,
    userId: DataTypes.INTEGER,
  },

  {
    // timestamps: false,
    sync: { alter: true },
    freezeTableName: true,
  }
);

export default productsModel;
