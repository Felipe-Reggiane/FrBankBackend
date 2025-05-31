import { AppDataSource } from "../config/database";
import Account from "../models/Account";
import Cliente from "../models/Client";

class AccountService {
  private contaRepo = AppDataSource.getRepository(Account);
  private clienteRepo = AppDataSource.getRepository(Cliente);

  async createAccount(clienteId: number): Promise<Account> {
    const client = await this.clienteRepo.findOneBy({ id: clienteId });
    if (!client) throw new Error("Cliente não encontrado");

    const initialLetters = client.name.substring(0, 2).toUpperCase();

    const randomNumber = String(Math.floor(100000 + Math.random() * 900000));

    const accountNumber = `${initialLetters}-${randomNumber}`;

    const account = this.contaRepo.create({
      number: accountNumber,
      balance: 0,
      client,
    });

    return this.contaRepo.save(account);
  }

  async getAccounts(clienteId: number): Promise<Account[] | null> {
    const accounts = await this.contaRepo.find({
      where: { client: { id: clienteId } },
      relations: ["client"],
    });
    return accounts.length > 0 ? accounts : null;
  }
}

export default new AccountService();
