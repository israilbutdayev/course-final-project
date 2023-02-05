const express = require("express");
const {
  registration,
  login,
  logout,
  info,
  refresh,
  update,
} = require("../../controllers/users-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const usersModel = require("../../models/users");
const tokensModel = require("../../models/tokens");

const usersRouter = express.Router();

usersRouter.use(async (req, res, next) => {
  await usersModel.sync();
  await tokensModel.sync();
  next();
});

usersRouter.post("/refresh", refresh);

usersRouter.post("/registration", registration);

usersRouter.post("/login", login);

usersRouter.use(authMiddleware);

usersRouter.get("/logout", logout);

usersRouter.post("/info", info);

usersRouter.put("/update", update);

module.exports = usersRouter;