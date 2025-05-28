import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { criar, consultar } from "../controllers/ContaController";

const router = Router();

router.use(authMiddleware); // Protege todas as rotas abaixo

router.post("/create", criar);
router.get("/", consultar);

export default router;
