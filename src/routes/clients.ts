import { Router } from "express";
import ClientController from "../controllers/ClientController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", ClientController.create);
router.get("/", ClientController.getAll);
router.put("/:id", authMiddleware, ClientController.update);
router.get("/:id/detalhamento", authMiddleware, ClientController.detalhamento);

export default router;

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-00"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               phone:
 *                 type: string
 *                 example: "(11) 98765-4321"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: CPF já cadastrado ou dados inválidos
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
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
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   cpf:
 *                     type: string
 *                     example: "123.456.789-00"
 *                   phone:
 *                     type: string
 *                     example: "(11) 98765-4321"
 */

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza os dados de um cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "(11) 98765-4321"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou cliente não encontrado
 */

/**
 * @swagger
 * /clientes/{id}/detalhamento:
 *   get:
 *     summary: Retorna o detalhamento de um cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Detalhamento do cliente
 *       400:
 *         description: Cliente não encontrado
 */
