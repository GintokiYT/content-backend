import { prisma } from "@/utils/prisma";
import type { Book } from "@/types/index";

const createBook = async (value: Book) => {
  try {
    const { id, ...book } = value;
    const newBook = await prisma.books.create({ data: book });
    return newBook;
  } catch (error: unknown) {
    throw new Error('Error creating book');
  }
}

export default createBook;