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

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Gerenciamento de contas
 */

/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Cria uma nova conta para o cliente autenticado
 *     tags: [Accounts]
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retorna todas as contas do cliente autenticado
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Lista de contas
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
 *                   number:
 *                     type: string
 *                     example: "TE-123456"
 *                   balance:
 *                     type: number
 *                     example: 1000.50
 *                   limit:
 *                     type: number
 *                     example: 500.00
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /accounts/update-limit:
 *   put:
 *     summary: Atualiza o limite de uma conta
 *     tags: [Accounts]
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
 *               newLimit:
 *                 type: number
 *                 example: 1000.00
 *     responses:
 *       200:
 *         description: Limite atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou conta não encontrada
 */

/**
 * @swagger
 * /accounts/transfer:
 *   post:
 *     summary: Realiza uma transferência entre contas
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumberOrigem:
 *                 type: string
 *                 example: "TE-123456"
 *               accountNumberDestino:
 *                 type: string
 *                 example: "TE-654321"
 *               value:
 *                 type: number
 *                 example: 200.00
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso
 *       400:
 *         description: Dados inválidos ou saldo insuficiente
 */
