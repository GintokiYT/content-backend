import { prisma } from "@/utils/prisma";

const getAllOrders = async () => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        client: {
          select: {
            id: true,
            doc_type: true,
            doc_number: true,
            first_name: true,
            last_name: true,
            phone: true,
            email: true,
          },
        },
        details: {
          include: {
            book: {
              select: {
                id: true,
                isbn: true,
                name: true,
                image: true,
                price: true,
                stock: true,
              },
            },
          },
        },
      },
    });
    return orders;
  } catch (error: unknown) {
    throw new Error('Error fetching books');
  }
}

export default getAllOrders;