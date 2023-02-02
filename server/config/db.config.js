const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("final_project", "root", "0000", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
