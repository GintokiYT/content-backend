import { prisma } from "@/utils/prisma";
import type { Book } from "@/types/index";

const updateBook = async (value: Book) => {
  try {
    const { id, ...data } = value;
    const bookExists = await prisma.books.findUnique({
      where: { id },
    });
    if (!bookExists) {
      throw new Error("El libro no existe");
    }
    const book = await prisma.books.update({
      where: { id },  
      data,
    });
    return book;
  } catch (error) {
    throw new Error("Fallo en la actualización del libro");
  }
}

export default updateBook;