import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { create, getAccounts } from "../controllers/AccountController";

const router = Router();

router.use(authMiddleware); // Protege todas as rotas abaixo

router.post("/create", create);
router.get("/", getAccounts);

export default router;
