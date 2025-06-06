import { Request, Response } from "express";
import AuthService from "../services/AuthService";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
      res.status(400).json({ erro: "CPF e senha são obrigatórios" });
      return;
    }

    const token = await AuthService.login(cpf, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ erro: err.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ mensagem: "Logout efetuado com sucesso" });
};
