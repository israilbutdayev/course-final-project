import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware.js";
import {
  add,
  get,
  remove,
  search,
} from "../../controllers/products-controller.js";

const productsRouter = Router();

productsRouter.post("/search", search);

productsRouter.get("/:id?", get);

productsRouter.use(authMiddleware);

productsRouter.post("/", get);

productsRouter.delete("/:id", remove);

productsRouter.post("/add", add);

export default productsRouter;
