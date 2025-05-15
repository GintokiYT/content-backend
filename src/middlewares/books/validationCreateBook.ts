import { Request, Response, NextFunction } from "express";
import { createBookSchema } from "@/models/books";

const validationCreateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = createBookSchema.safeParse(req.body);

    if(!isValid.success) {
      let errors = isValid.error.errors.map( error => {
        return {
          field: error.path[0],
          message: error.message
        }
      });
      res.status(400).json({ errors: errors });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Validation failed", error });
  }
};

export default validationCreateBook;