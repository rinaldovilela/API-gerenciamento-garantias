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

module.exports = router;
