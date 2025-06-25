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

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Gerenciamento de transações
 */

/**
 * @swagger
 * /transactions/debit:
 *   post:
 *     summary: Realiza um débito em uma conta
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 example: "TE-123456"
 *               value:
 *                 type: number
 *                 example: 100.50
 *     responses:
 *       200:
 *         description: Débito realizado com sucesso
 *       400:
 *         description: Dados inválidos ou saldo insuficiente
 */

/**
 * @swagger
 * /transactions/credit:
 *   post:
 *     summary: Realiza um crédito em uma conta
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 example: "TE-123456"
 *               value:
 *                 type: number
 *                 example: 200.75
 *     responses:
 *       200:
 *         description: Crédito realizado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retorna todas as transações do cliente autenticado
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   type:
 *                     type: string
 *                     example: "debit"
 *                   operation:
 *                     type: string
 *                     example: "withdraw"
 *                   value:
 *                     type: number
 *                     example: 100.50
 *                   accountNumber:
 *                     type: string
 *                     example: "TE-123456"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-06-25T12:34:56Z"
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /transactions/{accountNumber}:
 *   get:
 *     summary: Retorna todas as transações de uma conta específica
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Número da conta
 *     responses:
 *       200:
 *         description: Lista de transações da conta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   type:
 *                     type: string
 *                     example: "credit"
 *                   operation:
 *                     type: string
 *                     example: "deposit"
 *                   value:
 *                     type: number
 *                     example: 200.75
 *                   accountNumber:
 *                     type: string
 *                     example: "TE-123456"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-06-25T12:34:56Z"
 *       401:
 *         description: Não autenticado
 */
