import { Router } from "express";
import ClienteController from "../controllers/ClienteController";

const router = Router();

router.post("/", ClienteController.cadastrar);
router.get("/", ClienteController.listarTodos);

export default router;
