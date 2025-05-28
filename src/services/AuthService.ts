import { AppDataSource } from "../config/database";
import Cliente from "../models/Cliente";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async login(cpf: string, senha: string) {
    const repo = AppDataSource.getRepository(Cliente);
    const cliente = await repo.findOne({ where: { cpf } });

    if (!cliente) {
      throw new Error("CPF ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      throw new Error("CPF ou senha inválidos");
    }

    const token = jwt.sign(
      {
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new AuthService();
