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

  async update(id: number, phone?: string, password?: string) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new Error("Cliente não encontrado");

    if (phone) client.phone = phone;
    if (password) client.password = await bcrypt.hash(password, 10);

    return this.clientRepo.save(client);
  }

  async getAll() {
    return this.clientRepo.find();
  }
}

export default new ClientService();
