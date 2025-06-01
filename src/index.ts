import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";

import clienteRoutes from "./routes/clients";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/accounts";

dotenv.config();

AppDataSource.initialize()
  .then(() => console.log("Banco de dados conectado"))
  .catch((err) => console.error("Erro ao conectar no banco:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API do Banco funcionando"));

app.use("/clientes", clienteRoutes);

app.use("/auth", authRoutes);

app.use("/accounts", accountRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
