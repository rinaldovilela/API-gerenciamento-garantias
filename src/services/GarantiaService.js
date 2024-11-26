const GarantiaRepository = require("../repositories/GarantiaRepository");

class GarantiaService {
  async criarGarantia(garantiaData) {
    if (!garantiaData.produtoId || !garantiaData.clienteId) {
      throw new Error("Produto e Cliente são obrigatórios");
    }

    const garantia = await GarantiaRepository.create(garantiaData);
    return garantia;
  }

  async listarGarantias() {
    return await GarantiaRepository.findAll();
  }

  async obterGarantia(garantiaId) {
    return await GarantiaRepository.findById(garantiaId);
  }

  async atualizarGarantia(garantiaId, updateData) {
    return await GarantiaRepository.update(garantiaId, updateData);
  }

  async deletarGarantia(garantiaId) {
    const garantia = await GarantiaRepository.findById(garantiaId);
    if (!garantia) throw new Error("Garantia não encontrada");
    return await GarantiaRepository.delete(garantiaId);
  }

  // Atualiza o status da garantia para 'ativa' ou 'expirada' com base na data de validade
  async atualizarStatusGarantia(garantiaId) {
    const garantia = await GarantiaRepository.findById(garantiaId);
    if (!garantia) throw new Error("Garantia não encontrada");

    const hoje = new Date();
    garantia.status = hoje <= garantia.dataFim ? "ativa" : "expirada";
    await garantia.save();

    return garantia;
  }
}

module.exports = new GarantiaService();
