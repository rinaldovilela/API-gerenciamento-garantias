const mongoose = require("mongoose");

const GarantiaSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
  dataInicio: Date,
  dataFim: Date,
  status: { type: String, enum: ["ativa", "expirada"] },
});

module.exports = mongoose.model("Garantia", GarantiaSchema);
