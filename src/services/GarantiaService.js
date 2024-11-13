const GarantiaRepository = require("../repositories/GarantiaRepository");

class GarantiaService {
  // Criar uma nova garantia
  async criarGarantia(garantiaData) {
    // Garantir que produto e cliente são válidos
    if (!garantiaData.produtoId || !garantiaData.clienteId) {
      throw new Error("Produto e Cliente são obrigatórios");
    }

    // Criar e salvar a garantia no banco de dados
    const garantia = await GarantiaRepository.create(garantiaData);
    return garantia;
  }

  // Listar todas as garantias
  async listarGarantias() {
    return await GarantiaRepository.findAll();
  }

  // Obter uma garantia específica
  async obterGarantia(garantiaId) {
    return await GarantiaRepository.findById(garantiaId);
  }

  // Atualizar uma garantia
  async atualizarGarantia(garantiaId, updateData) {
    return await GarantiaRepository.update(garantiaId, updateData);
  }

  // Deletar uma garantia
  async deletarGarantia(garantiaId) {
    const garantia = await GarantiaRepository.findById(garantiaId);
    if (!garantia) {
      throw new Error("Garantia não encontrada");
    }
    return await GarantiaRepository.delete(garantiaId);
  }
}

module.exports = new GarantiaService();
