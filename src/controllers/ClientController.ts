import { Request, Response } from "express";
import ClientService from "../services/ClientService";

export default {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, password, phone } = req.body;
      const cliente = await ClientService.create(name, cpf, password, phone);
      res.status(201).json(cliente);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { phone, password } = req.body;
      if (!phone && !password) {
        res
          .status(400)
          .json({ erro: "Informe telefone ou senha para atualizar" });
        return;
      }
      const updated = await ClientService.update(Number(id), phone, password);
      res.json(updated);
      return;
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
      return;
    }
  },

  async getAll(req: Request, res: Response) {
    const clientes = await ClientService.getAll();
    res.json(clientes);
  },
};
