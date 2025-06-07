import { AppDataSource } from "../config/database";
import Transaction from "../models/Transaction";
import Account from "../models/Account";
import { In } from "typeorm";

class TransactionService {
  private transactionRepo = AppDataSource.getRepository(Transaction);
  private accountRepo = AppDataSource.getRepository(Account);

  async create(
    type: "debit" | "credit" | "bonus" | "tax",
    value: number,
    account: Account
  ) {
    const transaction = this.transactionRepo.create({
      type,
      value,
      account,
    });
    return this.transactionRepo.save(transaction);
  }

  async getAllByUser(clienteId: number) {
    const accounts = await this.accountRepo.find({
      where: { client: { id: clienteId } },
    });
    const accountIds = accounts.map((acc) => acc.id);

    return this.transactionRepo.find({
      relations: ["account"],
      where: accountIds.length > 0 ? { account: { id: In(accountIds) } } : {},
      order: { createdAt: "DESC" },
    });
  }

  async getByAccount(clienteId: number, accountNumber: string) {
    const account = await this.accountRepo.findOne({
      where: { number: accountNumber, client: { id: clienteId } },
    });
    if (!account)
      throw new Error("Erro: Conta não encontrada ou não pertence ao usuário");

    return this.transactionRepo.find({
      where: { account: { id: account.id } },
      relations: ["account"],
      order: { createdAt: "DESC" },
    });
  }
}

export default new TransactionService();
