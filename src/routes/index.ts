import { Router } from "express";
import { router as bookRouter } from "./books.route";

const router = Router();

router.use("/v1/books", bookRouter);

export { router }