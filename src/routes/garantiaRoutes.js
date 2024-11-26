const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const garantiaController = require("../controllers/garantiaController");

// Criar uma garantia manualmente
router.post(
  "/garantias",
  [
    body("produtoId").notEmpty().withMessage("O produto é obrigatório"),
    body("dataInicio")
      .notEmpty()
      .withMessage("A data de início é obrigatória")
      .isISO8601()
      .toDate()
      .withMessage("Data de início deve estar no formato ISO8601"),
    body("dataFim")
      .notEmpty()
      .withMessage("A data de fim é obrigatória")
      .isISO8601()
      .toDate()
      .withMessage("Data de fim deve estar no formato ISO8601"),
    body("status")
      .notEmpty()
      .isIn(["ativa", "expirada"])
      .withMessage("Status deve ser 'ativa' ou 'expirada'"),
  ],
  garantiaController.registrarGarantia
);

// Listar todas as garantias
router.get("/garantias", garantiaController.listarGarantias);

// Obter uma garantia específica
router.get("/garantias/:id", garantiaController.obterGarantia);

// Atualizar uma garantia específica
router.put(
  "/garantias/:id",
  [
    body("produtoId").notEmpty().withMessage("O produto é obrigatório"),
    body("dataInicio")
      .notEmpty()
      .withMessage("A data de início é obrigatória")
      .isISO8601()
      .toDate()
      .withMessage("Data de início deve estar no formato ISO8601"),
    body("dataFim")
      .notEmpty()
      .withMessage("A data de fim é obrigatória")
      .isISO8601()
      .toDate()
      .withMessage("Data de fim deve estar no formato ISO8601"),
    body("status")
      .notEmpty()
      .isIn(["ativa", "expirada"])
      .withMessage("Status deve ser 'ativa' ou 'expirada'"),
  ],
  garantiaController.atualizarGarantia
);

// Deletar uma garantia
router.delete("/garantias/:id", garantiaController.deletarGarantia);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Garantia:
 *       type: object
 *       required:
 *         - produtoId
 *         - dataInicio
 *         - dataFim
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da garantia
 *         produtoId:
 *           type: string
 *           description: ID do produto associado à garantia
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           description: Data de início da garantia (formato ISO8601)
 *         dataFim:
 *           type: string
 *           format: date-time
 *           description: Data de término da garantia (formato ISO8601)
 *         status:
 *           type: string
 *           enum:
 *             - ativa
 *             - expirada
 *           description: Status da garantia (ativa ou expirada)
 *       example:
 *         produtoId: "64a78cbecfb1e9db5a5b1234"
 *         dataInicio: "2024-01-01T00:00:00Z"
 *         dataFim: "2024-12-31T23:59:59Z"
 *         status: "ativa"
 */

/**
 * @swagger
 * tags:
 *   name: Garantias
 *   description: Gerenciamento de garantias
 */

/**
 * @swagger
 * /api/garantias:
 *   post:
 *     summary: Criar uma garantia manualmente
 *     tags: [Garantias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Garantia'
 *     responses:
 *       201:
 *         description: Garantia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garantia'
 *       400:
 *         description: Erro na validação dos dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["O produto é obrigatório", "A data de início é obrigatória"]
 */

/**
 * @swagger
 * /api/garantias:
 *   get:
 *     summary: Listar todas as garantias
 *     tags: [Garantias]
 *     responses:
 *       200:
 *         description: Lista de garantias obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garantia'
 */

/**
 * @swagger
 * /api/garantias/{id}:
 *   get:
 *     summary: Obter uma garantia específica
 *     tags: [Garantias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia a ser recuperada
 *     responses:
 *       200:
 *         description: Garantia encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garantia'
 *       404:
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * /api/garantias/{id}:
 *   put:
 *     summary: Atualizar uma garantia específica
 *     tags: [Garantias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Garantia'
 *     responses:
 *       200:
 *         description: Garantia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garantia'
 *       400:
 *         description: Erro na validação dos dados fornecidos
 *       404:
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * /api/garantias/{id}:
 *   delete:
 *     summary: Deletar uma garantia
 *     tags: [Garantias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia a ser deletada
 *     responses:
 *       200:
 *         description: Garantia deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Garantia deletada com sucesso"
 *       404:
 *         description: Garantia não encontrada
 */
