import { AppDataSource } from "../config/database";
import Client from "../models/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async login(cpf: string, senha: string) {
    const repo = AppDataSource.getRepository(Client);
    const client = await repo.findOne({ where: { cpf } });

    if (!client) {
      throw new Error("CPF ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, client.password);
    if (!senhaValida) {
      throw new Error("CPF ou senha inválidos");
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
