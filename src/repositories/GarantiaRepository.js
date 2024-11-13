const Garantia = require("../models/Garantia");

class GarantiaRepository {
  // Criar uma nova garantia
  async create(garantiaData) {
    return await Garantia.create(garantiaData);
  }

  // Encontrar todas as garantias
  async findAll() {
    return await Garantia.find();
  }

  // Encontrar uma garantia por ID
  async findById(garantiaId) {
    return await Garantia.findById(garantiaId);
  }

  // Atualizar uma garantia
  async update(garantiaId, updateData) {
    return await Garantia.findByIdAndUpdate(garantiaId, updateData, {
      new: true,
    });
  }

  // Deletar uma garantia
  async delete(garantiaId) {
    return await Garantia.findByIdAndDelete(garantiaId);
  }
}

module.exports = new GarantiaRepository();
