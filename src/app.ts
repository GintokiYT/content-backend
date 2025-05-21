import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "@/routes/index";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Api activa" });
});

app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta '${req.originalUrl}' no existe en este servidor.`
  });
});

export default app;