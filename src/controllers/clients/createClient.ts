import { prisma } from "../../utils/prisma";
import type { Book, Client,  } from "../../types/index";

const createClient = async (data: Omit<Client, "id">) => {
  try {
    const newClient = await prisma.clients.create({ data });
    return newClient;
  } catch (error: unknown) {
    throw new Error('Error al crear el cliente');
  }
}

export default createClient;