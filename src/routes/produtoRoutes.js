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
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *                 example: "Smartphone X"
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *                 example: "Eletrônicos"
 *               fabricante:
 *                 type: string
 *                 description: Nome do fabricante
 *                 example: "Marca Y"
 *               dataCompra:
 *                 type: string
 *                 format: date
 *                 description: Data de compra do produto
 *                 example: "2023-11-12"
 *               garantiaMeses:
 *                 type: integer
 *                 description: Duração da garantia em meses
 *                 example: 12
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação dos dados de entrada
 *
 * /api/produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *                 example: "Smartphone X Atualizado"
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *                 example: "Eletrônicos"
 *               fabricante:
 *                 type: string
 *                 description: Nome do fabricante
 *                 example: "Marca Y"
 *               dataCompra:
 *                 type: string
 *                 format: date
 *                 description: Data de compra do produto
 *                 example: "2023-11-12"
 *               garantiaMeses:
 *                 type: integer
 *                 description: Duração da garantia em meses
 *                 example: 12
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados de entrada
 *       404:
 *         description: Produto não encontrado
 *
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
