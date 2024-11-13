const Garantia = require("../models/Garantia");

class GarantiaRepository {
  async create(garantiaData) {
    const garantia = new Garantia(garantiaData);
    return await garantia.save();
  }

  // Outros métodos de manipulação de garantias, como find, update, etc.
}

module.exports = new GarantiaRepository();
