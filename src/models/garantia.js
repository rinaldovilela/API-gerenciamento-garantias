const mongoose = require("mongoose");

const garantiaSchema = new mongoose.Schema(
  {
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" }, // Referência para Produto
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
    dataInicio: Date,
    dataFim: Date,
    status: { type: String, enum: ["ativa", "expirada"] },
  },
  { timestamps: true } // Habilita timestamps
);

module.exports = mongoose.model("Garantia", garantiaSchema);
