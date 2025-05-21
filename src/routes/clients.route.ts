import createClient from "../controllers/clients/createClient";
import getAllClients from "../controllers/clients/getAllClients";
import { Request, Response, Router } from "express";

const router = Router();

// Obtener todos los clientes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Agregar un cliente
router.post("/", async (req: Request, res: Response) => {
  try {
    const newClient = await createClient(req.body);
    res.status(201).json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export { router };