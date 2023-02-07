import { Router } from "express";
import { createConnection } from "mysql";
import usersRouter from "./users.js";
import productsRouter from "./products.js";

const router = Router();

const connection = createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "final_project",
});

connection.connect();

router.use("/user", usersRouter);

router.use("/products", productsRouter);

export default router;
