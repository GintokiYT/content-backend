import { prisma } from "../../utils/prisma";

const getAllClients = async () => {
  try {
    const clients = await prisma.clients.findMany();
    return clients;
  } catch (error: unknown) {
    throw new Error("Error al obtener los clientes");
  }
}

export default getAllClients;