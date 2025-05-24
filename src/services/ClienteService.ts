import { AppDataSource } from "../config/database";
import Cliente from "../models/Cliente";
import bcrypt from "bcrypt";

class ClienteService {
  private clienteRepo = AppDataSource.getRepository(Cliente);

  async cadastrar(nome: string, cpf: string, senha: string) {
    const existe = await this.clienteRepo.findOne({ where: { cpf } });
    if (existe) throw new Error("Cliente com esse CPF já existe");

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoCliente = this.clienteRepo.create({
      nome,
      cpf,
      senha: senhaCriptografada,
    });
    return await this.clienteRepo.save(novoCliente);
  }

  async listarTodos() {
    return this.clienteRepo.find();
  }
}

export default new ClienteService();
