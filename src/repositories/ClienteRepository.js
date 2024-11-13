const Cliente = require("../models/cliente");

class ClienteRepository {
  async create(clienteData) {
    return await Cliente.create(clienteData);
  }

  async findAll() {
    return await Cliente.find().populate("produtos"); // Adiciona os produtos associados
  }

  async findById(clienteId) {
    return await Cliente.findById(clienteId).populate("produtos"); // Adiciona os produtos associados
  }

  async update(clienteId, updateData) {
    return await Cliente.findByIdAndUpdate(clienteId, updateData, {
      new: true,
    });
  }

  async delete(clienteId) {
    return await Cliente.findByIdAndDelete(clienteId);
  }
}

module.exports = new ClienteRepository();
