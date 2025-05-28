import { Request, Response } from "express";
import ContaService from "../services/ContaService";

export const criar = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.usuario?.id) {
      return res.status(401).json({ erro: "Não autenticado" });
    }

    const conta = await ContaService.criarConta(req.usuario.id);
    return res.status(201).json(conta);
  } catch (err: any) {
    return res.status(400).json({ erro: err.message });
  }
};

export const consultar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.usuario?.id) {
      return res.status(401).json({ erro: "Não autenticado" });
    }

    const clienteId = req.usuario?.id;
    const conta = await ContaService.consultarConta(clienteId);
    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });
    return res.json(conta);
  } catch (err: any) {
    return res.status(400).json({ erro: err.message });
  }
};
