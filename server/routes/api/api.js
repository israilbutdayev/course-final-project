const express = require("express");
const products = require("./products.json");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const e = require("express");

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
  const jsonData = req.body;
  let cancel = false;
  ["firstName", "lastName", "email", "password"].forEach((prop) => {
    if (!jsonData[prop]) {
      cancel = true;
    }
  });
  if (cancel) {
    res.json({
      success: false,
      error: true,
      message: "Bütün xanalar daxil edilməyib.",
    });
  } else {
    const { firstName, lastName, email, password } = jsonData;
    connection.query(
      "SELECT * FROM users WHERE EMAIL=?",
      [email],
      (err, rows, fields) => {
        if (rows.length) {
          let dbPassword = rows[0].PASSWORD;
          let checkPassword = bcrypt.compareSync(password, dbPassword);
          if (checkPassword) {
            res.json({
              success: true,
              error: false,
              message: "Sistemə uğurla daxil olundu.",
            });
          } else {
            res.json({
              success: false,
              error: true,
              message: "Bu email artıq qeydiyyatdan keçib.",
            });
          }
        } else {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(password, salt);
          let command = `INSERT INTO users (FIRSTNAME, LASTNAME, EMAIL, PASSWORD) VALUES ("${firstName}","${lastName}","${email}","${hash}")`;
          connection.query(command, (err, rows, fields) => {
            if (rows.affectedRows && !err) {
              res.json({
                success: true,
                error: false,
                message: "İstifadəçi uğurla qeydiyyatdan keçdi.",
              });
            } else {
              res.json({ success: false, error: true, message: err });
            }
          });
        }
      }
    );
  }
});

router.post("/login", (req, res) => {
  const jsonData = req.body;
  let cancel = false;
  ["email", "password"].forEach((prop) => {
    if (!jsonData[prop]) {
      cancel = true;
    }
  });
  if (cancel) {
    res.json({
      success: false,
      error: true,
      message: "Məlumatlar tam daxil edilməyib.",
    });
  } else {
    const { email, password } = jsonData;
    connection.query(
      "SELECT * FROM users WHERE EMAIL=?",
      [email],
      (err, rows, fields) => {
        if (rows.length && !err) {
          let dbPassword = rows[0].PASSWORD;
          let checkPassword = bcrypt.compareSync(password, dbPassword);
          if (checkPassword) {
            res.json({
              success: true,
              error: false,
              message: "Sistemə uğurla daxil olundu.",
            });
          } else {
            res.json({
              success: false,
              error: true,
              message: "Daxil edilən şifrə yanlışdır.",
            });
          }
        } else {
          res.json({
            success: false,
            error: true,
            message: "Belə bir email qeydiyyatdan keçməyib.",
          });
        }
      }
    );
  }
});

router.post("/logout", (req, res) => {
  res.send("ok");
});

module.exports = router;
