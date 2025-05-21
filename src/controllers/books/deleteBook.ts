import { prisma } from "@/utils/prisma";
import type { Book } from "@/types/index";

const deleteBook = async (id: Book["id"]) => {
  try {
    const book = await prisma.books.delete({ where: { id } });
    return book;
  } catch (error: unknown) {
    throw new Error('Error deleting book');
  }
}

export default deleteBook;