import express from "express";
import {
  registration,
  login,
  logout,
  info,
  refresh,
  update,
} from "../../controllers/users-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";

const usersRouter = express.Router();

usersRouter.post("/refresh", refresh);

usersRouter.post("/registration", registration);

usersRouter.post("/login", login);

usersRouter.use(authMiddleware);

usersRouter.get("/logout", logout);

usersRouter.post("/info", info);

usersRouter.put("/update", update);

export default usersRouter;
