const mongoose = require("mongoose");

const GarantiaSchema = new mongoose.Schema({
  produtoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date, required: true },
  status: { type: String, enum: ["ativa", "expirada"], default: "ativa" },
});

module.exports = mongoose.model("Garantia", GarantiaSchema);
