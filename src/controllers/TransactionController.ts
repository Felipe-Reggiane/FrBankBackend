import { Request, Response } from "express";
import AccountService from "../services/AccountService";
import TransactionService from "../services/TransactionService";

export const debit = async (req: Request, res: Response) => {
  try {
    const clienteId = req.usuario?.id;
    const { accountNumber, value } = req.body;
    if (!clienteId || !accountNumber || !value) {
      res.status(400).json({ erro: "Dados obrigatórios não informados" });
      return;
    }
    const account = await AccountService.debitByNumber(
      clienteId,
      accountNumber,
      Number(value)
    );
    res.json(account);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const credit = async (req: Request, res: Response) => {
  try {
    const clienteId = req.usuario?.id;
    const { accountNumber, value } = req.body;
    if (!clienteId || !accountNumber || !value) {
      res.status(400).json({ erro: "Dados obrigatórios não informados" });
      return;
    }
    const account = await AccountService.creditByNumber(
      clienteId,
      accountNumber,
      Number(value)
    );
    res.json(account);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const clienteId = req.usuario?.id;
    if (!clienteId) {
      res.status(401).json({ erro: "Não autenticado" });
      return;
    }
    const transactions = await TransactionService.getAllByUser(clienteId);
    res.json(transactions);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};

export const getTransactionsByAccount = async (req: Request, res: Response) => {
  try {
    const clienteId = req.usuario?.id;
    const { accountNumber } = req.params;
    if (!clienteId || !accountNumber) {
      res.status(400).json({ erro: "Dados obrigatórios não informados" });
      return;
    }
    const transactions = await TransactionService.getByAccount(
      clienteId,
      accountNumber
    );
    res.json(transactions);
    return;
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
    return;
  }
};
