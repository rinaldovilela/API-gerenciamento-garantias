const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cliente", ClienteSchema);
