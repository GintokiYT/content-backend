import { prisma } from "@/utils/prisma";

const getAllBooks = async () => {
  try {
    const books = await prisma.books.findMany();
    return books;
  } catch (error: unknown) {
    throw new Error('Error fetching books');
  }
}

export default getAllBooks;