import { Router } from "express";
import ClientController from "../controllers/ClientController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", ClientController.create);
router.get("/", ClientController.getAll);
router.put("/:id", authMiddleware, ClientController.update);
router.get("/:id/detalhamento", authMiddleware, ClientController.detalhamento);

export default router;
