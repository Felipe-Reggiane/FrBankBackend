import { AppDataSource } from "../config/database";
import Account from "../models/Account";
import Cliente from "../models/Client";
import TransactionService from "./TransactionService";

class AccountService {
  private contaRepo = AppDataSource.getRepository(Account);
  private clienteRepo = AppDataSource.getRepository(Cliente);

  async createAccount(clienteId: number): Promise<Account> {
    const client = await this.clienteRepo.findOneBy({ id: clienteId });
    if (!client) throw new Error("Erro: Cliente não encontrado");

    const initialLetters = client.name.substring(0, 2).toUpperCase();

    const randomNumber = String(Math.floor(100000 + Math.random() * 900000));

    const accountNumber = `${initialLetters}-${randomNumber}`;

    const account = this.contaRepo.create({
      number: accountNumber,
      balance: 0,
      limit: 0,
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
      throw new Error("Erro: Conta não encontrada ou não pertence ao usuário");
    if (value <= 0) throw new Error("Erro: Valor inválido");

    const saldoDisponivel = Number(account.balance) + Number(account.limit);

    if (value > saldoDisponivel) {
      throw new Error(
        "Erro: Valor excede o saldo disponível (saldo + limite da conta)"
      );
    }

    await TransactionService.create("debit", value, account, "withdraw");

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
      throw new Error("Erro: Conta não encontrada ou não pertence ao usuário");
    if (value <= 0) throw new Error("Erro: Valor inválido");

    const accounts = await this.contaRepo.find({
      where: { client: { id: clienteId } },
    });
    const saldoTotal = accounts.reduce(
      (acc, accItem) => acc + Number(accItem.balance),
      0
    );

    await TransactionService.create("credit", value, account, "deposit");
    account.balance = Number(account.balance) + value;

    if (value > saldoTotal) {
      const bonus = value * 0.1;
      await TransactionService.create("credit", bonus, account, "bonus");
      account.balance = Number(account.balance) + bonus;
    }

    return this.contaRepo.save(account);
  }

  async updateLimit(
    clienteId: number,
    accountNumber: string,
    newLimit: number
  ): Promise<Account> {
    const account = await this.contaRepo.findOne({
      where: { number: accountNumber, client: { id: clienteId } },
    });

    if (!account) {
      throw new Error("Erro: Conta não encontrada ou não pertence ao usuário");
    }

    if (newLimit <= account.limit) {
      throw new Error("Erro: O novo limite deve ser maior que o limite atual");
    }

    account.limit = newLimit;
    return this.contaRepo.save(account);
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.contaRepo.find({
      relations: ["client"],
    });
  }

  async transferBetweenAccounts(
    clienteIdOrigem: number,
    accountNumberOrigem: string,
    accountNumberDestino: string,
    value: number
  ): Promise<{ origem: Account; destino: Account }> {
    if (value <= 0) throw new Error("Erro: Valor inválido");

    const contaOrigem = await this.contaRepo
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.client", "client")
      .where("account.number = :number AND client.id = :clientId", {
        number: accountNumberOrigem,
        clientId: clienteIdOrigem,
      })
      .getOne();

    if (!contaOrigem || !contaOrigem.client) {
      throw new Error(
        "Erro: Conta origem não encontrada ou cliente não carregado"
      );
    }

    const contaDestino = await this.contaRepo
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.client", "client")
      .where("account.number = :number", { number: accountNumberDestino })
      .getOne();

    if (!contaDestino || !contaDestino.client) {
      throw new Error(
        "Erro: Conta destino não encontrada ou cliente não carregado"
      );
    }

    const saldoDisponivelOrigem =
      Number(contaOrigem.balance) + Number(contaOrigem.limit);
    if (value > saldoDisponivelOrigem) {
      throw new Error(
        "Erro: Valor excede o saldo disponível (saldo + limite da conta origem)"
      );
    }

    let valorTransferido = value;
    let taxa = 0;

    if (contaOrigem.client.id !== contaDestino.client.id) {
      taxa = value * 0.1;
      valorTransferido = value - taxa;

      await TransactionService.create("debit", taxa, contaOrigem, "tax");
    }

    await TransactionService.create(
      "debit",
      valorTransferido,
      contaOrigem,
      "transfer"
    );
    contaOrigem.balance = Number(contaOrigem.balance) - value;

    await TransactionService.create(
      "credit",
      valorTransferido,
      contaDestino,
      "transfer"
    );
    contaDestino.balance = Number(contaDestino.balance) + valorTransferido;

    await this.contaRepo.save(contaOrigem);

    await this.contaRepo.save(contaDestino);

    return { origem: contaOrigem, destino: contaDestino };
  }
}

export default new AccountService();
