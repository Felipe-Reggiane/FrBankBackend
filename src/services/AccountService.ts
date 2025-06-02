import { AppDataSource } from "../config/database";
import Account from "../models/Account";
import Cliente from "../models/Client";
import TransactionService from "./TransactionService";

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

  async debitByNumber(
    clienteId: number,
    accountNumber: string,
    value: number
  ): Promise<Account> {
    const account = await this.contaRepo.findOne({
      where: { number: accountNumber, client: { id: clienteId } },
    });
    if (!account)
      throw new Error("Conta não encontrada ou não pertence ao usuário");
    if (value <= 0) throw new Error("Valor inválido");
    if (Number(account.balance) < value) throw new Error("Saldo insuficiente");

    await TransactionService.create("debit", value, account);

    account.balance = Number(account.balance) - value;
    return this.contaRepo.save(account);
  }

  async creditByNumber(
    clienteId: number,
    accountNumber: string,
    value: number
  ): Promise<Account> {
    const account = await this.contaRepo.findOne({
      where: { number: accountNumber, client: { id: clienteId } },
    });
    if (!account)
      throw new Error("Conta não encontrada ou não pertence ao usuário");
    if (value <= 0) throw new Error("Valor inválido");

    await TransactionService.create("credit", value, account);

    account.balance = Number(account.balance) + value;
    return this.contaRepo.save(account);
  }
}

export default new AccountService();
