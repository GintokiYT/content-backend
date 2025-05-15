import express from "express";
import cors from "cors";
import { PORT } from "./utils/env";
import { router } from "@/routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});