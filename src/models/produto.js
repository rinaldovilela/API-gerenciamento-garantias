const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    categoria: { type: String, required: true },
    fabricante: { type: String, required: true },
    dataCompra: { type: Date, required: true },
    garantiaMeses: { type: Number, required: true },
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    }, // Relacionamento com Cliente
    garantias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Garantia" }], // Relacionamento com Garantia
  },
  { timestamps: true }
);

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
