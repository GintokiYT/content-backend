import { Request, Response, Router } from "express";
import { validationCreateBook } from "@/middlewares/books";
import { createBook } from "@/controllers/books";

const router = Router();

router.post("/", validationCreateBook, async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newBook = await createBook(req.body);
    res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export { router };