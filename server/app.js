const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api/api");
const app = express();
const port = 3000;

const pth = path.join(path.dirname(__dirname), "client");
app.use(express.static(path.join(pth)));
app.use(express.json());

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(pth, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
