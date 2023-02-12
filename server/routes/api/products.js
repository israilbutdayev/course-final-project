import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware.js";
import {
  add,
  get,
  remove,
  search,
} from "../../controllers/products-controller.js";

const productsRouter = Router();

productsRouter.get("/:id?", get);

productsRouter.post("/search", search);

productsRouter.use(authMiddleware);

productsRouter.delete("/:id", remove);

productsRouter.post("/", get);

productsRouter.post("/add", add);

export default productsRouter;
