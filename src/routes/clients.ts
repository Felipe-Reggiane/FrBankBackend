import { Router } from "express";
import ClientController from "../controllers/ClientController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", ClientController.create);
router.get("/", ClientController.getAll);

router.get("/protegido", authMiddleware, (req, res) => {
  res.json({ mensagem: `Olá, ${req.usuario?.nome}! Você está autenticado.` });
});

export default router;
