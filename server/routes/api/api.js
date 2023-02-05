const express = require("express");
const products = require("./products.json");
const router = express.Router();
const mysql = require("mysql");

const usersRouter = require("../api/users");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "final_project",
});

connection.connect();

router.get("/products", (req, res) => {
  res.json(products);
});

router.get("/product/:id", (req, res) => {});

router.use("/user", usersRouter);

module.exports = router;
