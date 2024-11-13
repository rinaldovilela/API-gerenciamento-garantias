const GarantiaRepository = require("../repositories/GarantiaRepository");

class GarantiaService {
  async criarGarantia(garantiaData) {
    // Validação pode ser realizada aqui, se necessário
    const garantia = await GarantiaRepository.create(garantiaData);
    return garantia;
  }
}

module.exports = new GarantiaService();
