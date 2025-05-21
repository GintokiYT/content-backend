import { Book } from "@/types";
import { prisma } from "@/utils/prisma";

const getBookId = async (id: Book["id"]) => {
  try {
    const books = await prisma.books.findFirst({ where: { id } });
    return books;
  } catch (error: unknown) {
    throw new Error('Error fetching books');
  }
}

export default getBookId;