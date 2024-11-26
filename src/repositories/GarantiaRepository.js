const Garantia = require("../models/garantia");

class GarantiaRepository {
  async create(garantiaData) {
    return await Garantia.create(garantiaData);
  }

  async findAll() {
    return await Garantia.find();
  }

  async findById(garantiaId) {
    return await Garantia.findById(garantiaId);
  }

  async update(garantiaId, updateData) {
    return await Garantia.findByIdAndUpdate(garantiaId, updateData, {
      new: true,
    });
  }

  async delete(garantiaId) {
    return await Garantia.findByIdAndDelete(garantiaId);
  }

  async deleteMany(query) {
    return await Garantia.deleteMany(query); // Para deletar múltiplas garantias associadas
  }
}

module.exports = new GarantiaRepository();
