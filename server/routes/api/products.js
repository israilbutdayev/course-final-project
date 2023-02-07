import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware.js";
import { add, get } from "../../controllers/products-controller.js";

const productsRouter = Router();

productsRouter.get("/:id?", get);

productsRouter.use(authMiddleware);

productsRouter.post("/add", add);

export default productsRouter;
