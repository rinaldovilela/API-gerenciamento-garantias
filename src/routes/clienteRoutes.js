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
