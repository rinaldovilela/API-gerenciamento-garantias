const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  fabricante: String,
  dataCompra: Date,
  garantiaMeses: Number,
});

module.exports = mongoose.model("Produto", ProdutoSchema);
