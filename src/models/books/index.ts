import z from "zod";

export const createBookSchema = z.object({
  isbn: z.string({ required_error: "ISBN is required" }).min(13).max(13),
  name: z.string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100),
  stock: z.coerce.number({ required_error: "Stock is required" }).int().positive(),
  price: z.coerce.number({ required_error: "Price is required" }).positive()
    .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'El precio debe tener como máximo 2 decimales',
    }),
  image: z.string({ required_error: "Image is required" }).max(100).optional()
});