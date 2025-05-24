import { Request, Response } from "express";
import ClienteService from "../services/ClienteService";

export default {
  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, cpf, senha } = req.body;
      const cliente = await ClienteService.cadastrar(nome, cpf, senha);
      res.status(201).json(cliente);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listarTodos(req: Request, res: Response) {
    const clientes = await ClienteService.listarTodos();
    res.json(clientes);
  },
};
