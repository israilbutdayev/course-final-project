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
const jwtMiddleware = require("../../middlewares/jwt-middleware");
const usersRouter = express.Router();

// usersRouter.use(jwtMiddleware);

usersRouter.post("/refresh", refresh);

usersRouter.post("/registration", registration);

usersRouter.post("/login", login);

usersRouter.use(authMiddleware);

usersRouter.get("/logout", logout);

usersRouter.post("/info", info);

usersRouter.put("/update", update);

module.exports = usersRouter;
