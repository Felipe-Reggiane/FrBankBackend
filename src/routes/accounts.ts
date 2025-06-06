import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { create, getAccounts } from "../controllers/AccountController";

const router = Router();

router.use(authMiddleware);

router.post("/create", create);
router.get("/", getAccounts);

export default router;
