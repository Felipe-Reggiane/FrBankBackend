import { AppDataSource } from "../config/database";
import Client from "../models/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async login(cpf: string, password: string) {
    const repo = AppDataSource.getRepository(Client);
    const client = await repo.findOne({ where: { cpf } });

    if (!client) {
      throw new Error("Erro: CPF ou senha inválidos");
    }

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword) {
      throw new Error("Erro: CPF ou senha inválidos");
    }

    const token = jwt.sign(
      {
        id: client.id,
        nome: client.name,
        cpf: client.cpf,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new AuthService();
