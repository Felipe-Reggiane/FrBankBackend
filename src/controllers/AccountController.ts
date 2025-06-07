import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteId = req.usuario?.id;
    if (!clienteId) {
      res.status(401).json({ erro: "Não autenticado" });
      return;
    }
    const account = await AccountService.createAccount(clienteId);
    res.status(201).json(account);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const getAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.usuario?.id) {
      res.status(401).json({ erro: "Não autenticado" });
      return;
    }

    const clienteId = req.usuario?.id;
    const conta = await AccountService.getAccounts(clienteId);
    if (!conta) {
      res.status(404).json({ erro: "Conta não encontrada" });
      return;
    }
    res.json(conta);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const updateLimit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clienteId = req.usuario?.id;
    const { accountNumber, newLimit } = req.body;

    if (!clienteId || !accountNumber || newLimit === undefined) {
      res.status(400).json({ erro: "Dados obrigatórios não informados" });
      return;
    }

    const updatedAccount = await AccountService.updateLimit(
      clienteId,
      accountNumber,
      Number(newLimit)
    );

    res.json(updatedAccount);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accounts = await AccountService.getAllAccounts();
    const formattedAccounts = accounts.map((account) => ({
      id: account.id,
      number: account.number,
      balance: account.balance,
      limit: account.limit,
      clientId: account.client.id,
    }));
    res.json(formattedAccounts);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const transfer = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteIdOrigem = req.usuario?.id;
    if (!clienteIdOrigem) {
      res.status(401).json({ erro: "Não autenticado" });
      return;
    }

    const { accountNumberOrigem, accountNumberDestino, value } = req.body;

    if (
      !clienteIdOrigem ||
      !accountNumberOrigem ||
      !accountNumberDestino ||
      !value
    ) {
      res.status(400).json({ erro: "Dados obrigatórios não informados" });
      return;
    }

    const { origem, destino } = await AccountService.transferBetweenAccounts(
      clienteIdOrigem,
      accountNumberOrigem,
      accountNumberDestino,
      Number(value)
    );

    res.status(200).json({ origem, destino });
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};
