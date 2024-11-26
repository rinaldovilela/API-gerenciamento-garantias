const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.post(
  "/",
  [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("O e-mail deve ser válido"),
    body("telefone").notEmpty().withMessage("O telefone é obrigatório"),
    body("endereco").notEmpty().withMessage("O endereço é obrigatório"),
  ],
  clienteController.registrarCliente
);

router.get("/", clienteController.listarClientes);

router.get("/:id", clienteController.obterClienteComProdutos);

router.put(
  "/:id",
  [
    body("nome")
      .optional()
      .notEmpty()
      .withMessage("O nome não pode estar vazio"),
    body("email").optional().isEmail().withMessage("O e-mail deve ser válido"),
    body("telefone")
      .optional()
      .notEmpty()
      .withMessage("O telefone não pode estar vazio"),
    body("endereco")
      .optional()
      .notEmpty()
      .withMessage("O endereço não pode estar vazio"),
  ],
  clienteController.atualizarCliente
);

router.delete("/:id", clienteController.deletarCliente);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - endereco
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         email:
 *           type: string
 *           description: Email do cliente
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *         endereco:
 *           type: string
 *           description: Endereço do cliente
 *       example:
 *         nome: João Silva
 *         email: joao.silva@example.com
 *         telefone: "123456789"
 *         endereco: Rua das Flores, 123
 */

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * api/clientes:
 *   post:
 *     summary: Registra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro na validação dos dados
 */

/**
 * @swagger
 * api/clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obter informações de um cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Informações do cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Exclui um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
