import { Router } from "express";
import authMiddleware from "../middleware/auth";
import {
  create,
  getAccounts,
  getAllAccounts,
  transfer,
  updateLimit,
} from "../controllers/AccountController";

const router = Router();

router.use(authMiddleware);

router.post("/create", create);
router.get("/", getAccounts);
router.put("/update-limit", updateLimit);
router.get("/all", getAllAccounts);
router.post("/transfer", transfer);

export default router;
