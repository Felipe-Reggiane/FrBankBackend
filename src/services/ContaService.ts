import { AppDataSource } from "../config/database";
import Conta from "../models/Conta";
import Cliente from "../models/Cliente";

class ContaService {
  private contaRepo = AppDataSource.getRepository(Conta);
  private clienteRepo = AppDataSource.getRepository(Cliente);

  async criarConta(clienteId: number): Promise<Conta> {
    const cliente = await this.clienteRepo.findOneBy({ id: clienteId });
    if (!cliente) throw new Error("Cliente não encontrado");

    const numeroAleatorio = String(Math.floor(100000 + Math.random() * 900000));

    const conta = this.contaRepo.create({
      numero: numeroAleatorio,
      saldo: 0,
      cliente,
    });

    return this.contaRepo.save(conta);
  }

  async consultarConta(clienteId: number): Promise<Conta | null> {
    return this.contaRepo.findOne({
      where: { cliente: { id: clienteId } },
      relations: ["cliente"],
    });
  }
}

export default new ContaService();
