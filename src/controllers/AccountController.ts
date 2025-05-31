import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clienteId } = req.body;
    if (!clienteId) {
      res.status(400).json({ erro: "clienteId é obrigatório" });
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
