import { Router } from "express";
import ClienteController from "../controllers/ClienteController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", ClienteController.cadastrar);
router.get("/", ClienteController.listarTodos);

router.get("/protegido", authMiddleware, (req, res) => {
  res.json({ mensagem: `Olá, ${req.usuario?.nome}! Você está autenticado.` });
});

export default router;
