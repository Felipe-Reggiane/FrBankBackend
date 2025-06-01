import { AppDataSource } from "../config/database";
import Client from "../models/Client";
import bcrypt from "bcrypt";

class ClientService {
  private clientRepo = AppDataSource.getRepository(Client);

  async create(name: string, cpf: string, password: string, phone: string) {
    const repeatedCpf = await this.clientRepo.findOne({ where: { cpf } });
    if (repeatedCpf) {
      throw new Error("Cliente com esse CPF já existe");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newClient = this.clientRepo.create({
      name,
      cpf,
      password: encryptedPassword,
      phone,
    });
    return await this.clientRepo.save(newClient);
  }

  async getAll() {
    return this.clientRepo.find();
  }
}

export default new ClientService();
