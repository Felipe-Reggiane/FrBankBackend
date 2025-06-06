import { AppDataSource } from "../config/database";
import Client from "../models/Client";
import bcrypt from "bcrypt";
import Transaction from "../models/Transaction";
import { Between } from "typeorm";
import Account from "../models/Account";

class ClientService {
  private clientRepo = AppDataSource.getRepository(Client);

  async create(name: string, cpf: string, password: string, phone: string) {
    const repeatedCpf = await this.clientRepo.findOne({ where: { cpf } });
    if (repeatedCpf) {
      throw new Error("Erro: CPF já cadastrado, tente outro.");
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
    if (!client) throw new Error("Erro: Cliente não encontrado");

    if (phone) client.phone = phone;
    if (password) client.password = await bcrypt.hash(password, 10);

    return this.clientRepo.save(client);
  }

  async getAll() {
    return this.clientRepo.find();
  }

  async getDetalhamento(clienteId: number) {
    const accountRepo = AppDataSource.getRepository(Account);
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const contas = await accountRepo.find({
      where: { client: { id: clienteId } },
    });

    const contasIds = contas.map((c) => c.id);

    const saldoTotal = contas.reduce((acc, c) => acc + Number(c.balance), 0);

    const transacoes = contasIds.length
      ? await transactionRepo
          .createQueryBuilder("t")
          .select([
            "t.type AS type",
            "DATE_TRUNC('month', t.createdAt) AS mes",
            "SUM(t.value)::float AS total",
          ])
          .where("t.account_id IN (:...contasIds)", { contasIds })
          .groupBy("mes")
          .addGroupBy("t.type")
          .orderBy("mes", "ASC")
          .getRawMany()
      : [];

    const resumoPorMes: Record<string, { debit: number; credit: number }> = {};

    for (const t of transacoes) {
      const mes = t.mes.toISOString().slice(0, 7);
      if (!resumoPorMes[mes]) resumoPorMes[mes] = { debit: 0, credit: 0 };
      resumoPorMes[mes][t.type] = Number(t.total);
    }

    return {
      contas: contas.length,
      saldoTotal,
      porMes: resumoPorMes,
    };
  }
}

export default new ClientService();
