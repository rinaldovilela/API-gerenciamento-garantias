const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    nome: String,
    categoria: String,
    fabricante: String,
    dataCompra: Date,
    garantiaMeses: Number,
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" }, // Relacionando com Cliente
  },
  { timestamps: true }
);

module.exports = mongoose.model("Produto", ProdutoSchema);
