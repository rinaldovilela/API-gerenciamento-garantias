const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }],
  },
  { timestamps: true }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
