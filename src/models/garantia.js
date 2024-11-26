const mongoose = require("mongoose");

const garantiaSchema = new mongoose.Schema(
  {
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
    dataInicio: Date,
    dataFim: Date,
    status: { type: String, enum: ["ativa", "expirada"] },
    notificacoes: { type: [Number], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garantia", garantiaSchema);
