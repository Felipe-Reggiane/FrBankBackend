import { Router } from "express";
import authMiddleware from "../middleware/auth";
import {
  debit,
  credit,
  getAllTransactions,
  getTransactionsByAccount,
} from "../controllers/TransactionController";

const router = Router();

router.use(authMiddleware);

router.post("/debit", debit);
router.post("/credit", credit);
router.get("/", getAllTransactions);
router.get("/:accountNumber", getTransactionsByAccount);

export default router;
