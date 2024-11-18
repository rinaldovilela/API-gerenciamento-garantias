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
 * api/garantias:
 *   post:
 *     summary: Criar uma garantia manualmente
 *     description: Endpoint para criar uma garantia manualmente para um produto, especificando data de início, data de fim e status.
 *     operationId: registrarGarantia
 *     requestBody:
 *       description: Dados para criar uma nova garantia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - dataInicio
 *               - dataFim
 *               - status
 *             properties:
 *               produtoId:
 *                 type: string
 *                 description: ID do produto ao qual a garantia está associada
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início da garantia (formato ISO8601)
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 description: Data de término da garantia (formato ISO8601)
 *               status:
 *                 type: string
 *                 enum:
 *                   - ativa
 *                   - expirada
 *                 description: Status da garantia (ativa ou expirada)
 *     responses:
 *       '201':
 *         description: Garantia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Garantia registrada com sucesso"
 *       '400':
 *         description: Requisição inválida, com erro na validação dos dados
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
 * api/garantias:
 *   get:
 *     summary: Listar todas as garantias
 *     description: Endpoint para listar todas as garantias registradas.
 *     operationId: listarGarantias
 *     responses:
 *       '200':
 *         description: Lista de garantias obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   produtoId:
 *                     type: string
 *                   dataInicio:
 *                     type: string
 *                     format: date-time
 *                   dataFim:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 */


/**
 * @swagger
 * api/garantias/{id}:
 *   get:
 *     summary: Obter uma garantia específica
 *     description: Endpoint para obter os detalhes de uma garantia específica, utilizando o ID.
 *     operationId: obterGarantia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da garantia a ser recuperada
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Garantia encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtoId:
 *                   type: string
 *                 dataInicio:
 *                   type: string
 *                   format: date-time
 *                 dataFim:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *       '404':
 *         description: Garantia não encontrada
 */


/**
 * @swagger
 * /garantias/{id}:
 *   put:
 *     summary: Atualizar uma garantia específica
 *     description: Endpoint para atualizar os detalhes de uma garantia específica, utilizando o ID.
 *     operationId: atualizarGarantia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da garantia a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados para atualizar a garantia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - dataInicio
 *               - dataFim
 *               - status
 *             properties:
 *               produtoId:
 *                 type: string
 *                 description: ID do produto ao qual a garantia está associada
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início da garantia (formato ISO8601)
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 description: Data de término da garantia (formato ISO8601)
 *               status:
 *                 type: string
 *                 enum:
 *                   - ativa
 *                   - expirada
 *                 description: Status da garantia (ativa ou expirada)
 *     responses:
 *       '200':
 *         description: Garantia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Garantia atualizada com sucesso"
 *       '400':
 *         description: Erro de validação nos dados fornecidos
 *       '404':
 *         description: Garantia não encontrada
 */

/**
 * @swagger
 * api/garantias/{id}:
 *   put:
 *     summary: Atualizar uma garantia específica
 *     description: Endpoint para atualizar os detalhes de uma garantia específica, utilizando o ID.
 *     operationId: atualizarGarantia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da garantia a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados para atualizar a garantia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - dataInicio
 *               - dataFim
 *               - status
 *             properties:
 *               produtoId:
 *                 type: string
 *                 description: ID do produto ao qual a garantia está associada
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início da garantia (formato ISO8601)
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 description: Data de término da garantia (formato ISO8601)
 *               status:
 *                 type: string
 *                 enum:
 *                   - ativa
 *                   - expirada
 *                 description: Status da garantia (ativa ou expirada)
 *     responses:
 *       '200':
 *         description: Garantia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Garantia atualizada com sucesso"
 *       '400':
 *         description: Erro de validação nos dados fornecidos
 *       '404':
 *         description: Garantia não encontrada
 */


/**
 * @swagger
 * api/garantias/{id}:
 *   delete:
 *     summary: Deletar uma garantia
 *     description: Endpoint para deletar uma garantia específica, utilizando o ID.
 *     operationId: deletarGarantia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da garantia a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Garantia deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Garantia deletada com sucesso"
 *       '404':
 *         description: Garantia não encontrada
 */