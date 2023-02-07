import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  database: "final_project",
  username: "root",
  password: "0000",
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
