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
 *           description: ID do produto associado
 *         clienteId:
 *           type: string
 *           description: ID do cliente associado
 *         dataInicio:
 *           type: string
 *           format: date
 *           description: Data de início da garantia
 *         dataFim:
 *           type: string
 *           format: date
 *           description: Data de fim da garantia
 *         status:
 *           type: string
 *           description: Status da garantia (ativa ou expirada)
 *       example:
 *         produtoId: 63b1f3e4f5a85e2b4f12e0c5
 *         clienteId: 63b1f3e4f5a85e2b4f12e0c5
 *         dataInicio: 2024-01-01
 *         dataFim: 2025-01-01
 *         status: ativa
 */

/**
 * @swagger
 * tags:
 *   name: Garantias
 *   description: Gerenciamento de garantias
 */

/**
 * @swagger
 * /garantias:
 *   post:
 *     summary: Cria uma nova garantia
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
 */

/**
 * @swagger
 * /garantias:
 *   get:
 *     summary: Lista todas as garantias
 *     tags: [Garantias]
 *     responses:
 *       200:
 *         description: Lista de garantias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garantia'
 */

/**
 * @swagger
 * /garantias/{id}:
 *   get:
 *     summary: Obtém detalhes de uma garantia específica
 *     tags: [Garantias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia
 *     responses:
 *       200:
 *         description: Detalhes da garantia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garantia'
 *       404:
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * /garantias/{id}:
 *   put:
 *     summary: Atualiza uma garantia existente
 *     tags: [Garantias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia
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
 *       404:
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * /garantias/{id}:
 *   delete:
 *     summary: Exclui uma garantia
 *     tags: [Garantias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia
 *     responses:
 *       200:
 *         description: Garantia excluída com sucesso
 *       404:
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * /garantias/{id}/status:
 *   put:
 *     summary: Atualiza o status de uma garantia (ativa ou expirada)
 *     tags: [Garantias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da garantia
 *     responses:
 *       200:
 *         description: Status da garantia atualizado com sucesso
 *       404:
 *         description: Garantia não encontrada
 */
