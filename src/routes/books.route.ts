import { Request, Response, Router } from "express";
import validationCreateBook from "@/middlewares/books/validationCreateBook";
import { createBook } from "@/controllers/books";
import { upload } from "@/middlewares/upload";
import cloudinary from "@/utils/cloudinary";
import fs from "fs";

const router = Router();

router.post("/", upload.single("image"), validationCreateBook, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Image file is required" });
      return;
    }

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "Content"
    });
    fs.unlinkSync(req.file.path);

    const bookData = {
      ...req.body,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
      image: cloudinaryResult.secure_url,
    };

    const newBook = await createBook(bookData);
    res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export { router };