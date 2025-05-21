import { Router } from "express";
import { router as bookRouter } from "./books.route";
import { router as clientRouter } from "./clients.route";
import { router as orderRouter } from "./orders.route";

const router = Router();

router.use("/v1/books", bookRouter);
router.use("/v1/clients", clientRouter);
router.use("/v1/orders", orderRouter);

export { router }