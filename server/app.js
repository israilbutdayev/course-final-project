const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const pth = path.join(path.dirname(__dirname), "client");
app.use(express.static(path.join(pth)));

app.get("*", (req, res) => {
  res.sendFile(path.join(pth, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
