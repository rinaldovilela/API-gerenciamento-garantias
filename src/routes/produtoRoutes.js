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
 *           example: "Smartphone X"
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *           example: "Eletrônicos"
 *         fabricante:
 *           type: string
 *           description: Nome do fabricante
 *           example: "Marca Y"
 *         dataCompra:
 *           type: string
 *           format: date
 *           description: Data de compra do produto
 *           example: "2023-11-12"
 *         garantiaMeses:
 *           type: integer
 *           description: Duração da garantia em meses
 *           example: 12
 *         clienteId:
 *           type: string
 *           description: ID do cliente associado ao produto
 *           example: "6534dba8f9bd6f0d73413e9f"
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
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
 *         description: Erro na validação dos dados fornecidos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

/**
 * @swagger
 * /api/produtos/garantias:
 *   get:
 *     summary: Lista produtos com suas garantias associadas
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos com garantias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
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
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser atualizado
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
 *       400:
 *         description: Erro na validação dos dados fornecidos
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser deletado
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produto deletado com sucesso"
 *       404:
 *         description: Produto não encontrado
 */
