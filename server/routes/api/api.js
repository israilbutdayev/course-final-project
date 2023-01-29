const express = require("express");
const products = require("./products.json");
const router = express.Router();
router.get("/products", (req, res) => {
  res.json(products);
});
router.get("/product/:id", (req, res) => {});
module.exports = router;
