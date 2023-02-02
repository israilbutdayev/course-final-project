const express = require("express");
const {
  registration,
  login,
  logout,
} = require("../../controllers/users-controller");
const usersRouter = express.Router();

usersRouter.post("/registration", registration);

usersRouter.post("/login", login);

usersRouter.get("/logout", logout);

module.exports = usersRouter;
