import { prisma } from "@/utils/prisma";
import type { Book } from "@/types/index";

const createBook = async (book: Book) => {
  console.log(book);
  try {
    // const newBook = await prisma.books.create({ data: { book }});
    // const newBook = await prisma.books.create({
    //   data: {
    //     isbn: book.isbn,
    //     name: book.name,
    //     stock: book.stock,
    //     price: book.price,
    //     image: book.image,
    //   }
    // })
    // return newBook;
    return null;
  } catch (error: unknown) {
    throw new Error('Error creating book');
  }
}

export default createBook;