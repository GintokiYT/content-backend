import { Request, Response, Router } from "express";
import validationCreateBook from "../middlewares/books/validationCreateBook";
import { upload } from "../middlewares/upload";
import cloudinary from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import fs from "fs";
import deleteBook from "../controllers/books/deleteBook";
import updateBook from "../controllers/books/updateBook";
import getBookId from "../controllers/books/getBookId";
import createBook from "../controllers/books/createBook";
import getAllBooks from "../controllers/books/getAllBooks";

const router = Router();

// Obtener todos los libros
router.get("/", async (_req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Agregar un libro
router.post("/", upload.single("image"), validationCreateBook, async (req: Request, res: Response): Promise<void> => {
  console.log('Agregando libro');

  if (!req.file) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }

  try {
    const streamUpload = (): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Content" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });
    };

    const cloudinaryResult = await streamUpload();

    const bookData = {
      ...req.body,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
      image: cloudinaryResult.secure_url,
      image_id: cloudinaryResult.public_id,
    };

    const newBook = await createBook(bookData);
    res.status(201).json({ message: "Book created successfully", book: newBook });

  } catch (error) {
    if (req.file) {
      try {
        const uploadedPublicId = (error as any)?.public_id;
        if (uploadedPublicId) {
          await cloudinary.uploader.destroy(uploadedPublicId);
        }
      } catch (_) {}
    }

    res.status(500).json({ error: (error as Error).message });
  }
});

// Eliminar un libro
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBook(parseInt(id));
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Actualizar un libro
router.put("/:id", upload.single("image"), async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await getBookId(parseInt(id));

  if(!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  try {
    const bookData = {
      ...req.body,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
    };

    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "Content"
      });
      fs.unlinkSync(req.file.path);

      bookData.image = cloudinaryResult.secure_url;
      bookData.image_id = cloudinaryResult.public_id;
    } else {
      bookData.image = book.image;
      bookData.image_id = book.image_id;
    }

    const updatedBook = await updateBook({ id: parseInt(id), ...bookData });
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});  

export { router };