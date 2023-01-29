const express = require("express");
const products = require("./products.json");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

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

router.post("/registration", (req, res) => {
  console.log(req.body);
  connection.query(
    "SELECT * FROM users WHERE EMAIL=?",
    ["israilbutdayev@gmail.com"],
    (err, rows, fields) => {
      // console.log(err);
      // console.log(rows);
      // console.log(fields);
      // if (!rows.length) {
      //   connection.query(
      //     "SELECT * FROM users WHERE EMAIL=?",
      //     [],
      //     (err, rows, fields) => {
      //       console.log(err);
      //       console.log(rows);
      //       if (err) {
      //         throw err;
      //       } else {
      //         res.send("ok");
      //       }
      //     }
      //   );
      // }
    }
  );
  res.send("ok");
});

router.post("/login", (req, res) => {
  res.send("ok");
});

router.post("/logout", (req, res) => {
  res.send("ok");
});

module.exports = router;
