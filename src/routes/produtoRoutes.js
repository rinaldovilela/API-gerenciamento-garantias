const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const produtoController = require("../controllers/produtoController");

// Validação ao criar um novo produto
router.post(
  "/produtos",
  [
    body("nome").notEmpty().withMessage("O nome do produto é obrigatório"),
    body("categoria").notEmpty().withMessage("A categoria é obrigatória"),
    body("fabricante").notEmpty().withMessage("O fabricante é obrigatório"),
    body("dataCompra")
      .notEmpty()
      .withMessage("A data de compra é obrigatória")
      .isISO8601()
      .toDate()
      .withMessage("Data de compra deve estar no formato ISO8601"),
    body("garantiaMeses")
      .isInt({ gt: 0 })
      .withMessage("A garantia deve ser um número inteiro positivo"),
    body("clienteId").notEmpty().withMessage("O ID do cliente é obrigatório"), // Validação do cliente
  ],
  produtoController.registrarProduto
);

router.get("/produtos/garantias", produtoController.listarProdutosComGarantias);
router.get("/produtos", produtoController.listarProdutos);
router.get("/produtos/:id", produtoController.obterProduto);

// Validações ao atualizar um produto
router.put(
  "/produtos/:id",
  [
    body("nome")
      .optional()
      .notEmpty()
      .withMessage("O nome não pode estar vazio"),
    body("categoria")
      .optional()
      .notEmpty()
      .withMessage("A categoria não pode estar vazia"),
    body("fabricante")
      .optional()
      .notEmpty()
      .withMessage("O fabricante não pode estar vazio"),
    body("dataCompra")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Data de compra deve estar no formato ISO8601"),
    body("garantiaMeses")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("A garantia deve ser um número inteiro positivo"),
  ],
  produtoController.atualizarProduto
);

router.delete("/produtos/:id", produtoController.deletarProduto);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - categoria
 *         - fabricante
 *         - dataCompra
 *         - garantiaMeses
 *         - clienteId
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *         fabricante:
 *           type: string
 *           description: Fabricante do produto
 *         dataCompra:
 *           type: string
 *           format: date
 *           description: Data de compra do produto
 *         garantiaMeses:
 *           type: integer
 *           description: Número de meses de garantia
 *         clienteId:
 *           type: string
 *           description: ID do cliente associado ao produto
 *         garantias:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs das garantias associadas ao produto
 *       example:
 *         nome: Notebook Dell XPS
 *         categoria: Eletrônicos
 *         fabricante: Dell
 *         dataCompra: 2023-10-01
 *         garantiaMeses: 24
 *         clienteId: 63b1f3e4f5a85e2b4f12e0c5
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro na validação dos dados
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

/**
 * @swagger
 * /produtos/garantias:
 *   get:
 *     summary: Lista todos os produtos com suas garantias
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos com garantias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Obtém detalhes de um produto específico
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Detalhes do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 */
