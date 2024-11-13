const GarantiaService = require("../services/GarantiaService");

class GarantiaController {
  // Registrar uma garantia
  async registrarGarantia(req, res) {
    try {
      const garantiaData = req.body;
      const novaGarantia = await GarantiaService.criarGarantia(garantiaData);
      res.status(201).json(novaGarantia);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Listar todas as garantias
  async listarGarantias(req, res) {
    try {
      const garantias = await GarantiaService.listarGarantias();
      res.status(200).json(garantias);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Obter uma garantia específica
  async obterGarantia(req, res) {
    try {
      const garantia = await GarantiaService.obterGarantia(req.params.id);
      if (!garantia) {
        return res.status(404).json({ message: "Garantia não encontrada" });
      }
      res.status(200).json(garantia);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Atualizar uma garantia
  async atualizarGarantia(req, res) {
    try {
      const garantiaAtualizada = await GarantiaService.atualizarGarantia(
        req.params.id,
        req.body
      );
      if (!garantiaAtualizada) {
        return res.status(404).json({ message: "Garantia não encontrada" });
      }
      res.status(200).json(garantiaAtualizada);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Deletar uma garantia
  async deletarGarantia(req, res) {
    try {
      const sucesso = await GarantiaService.deletarGarantia(req.params.id);
      if (!sucesso) {
        return res.status(404).json({ message: "Garantia não encontrada" });
      }
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new GarantiaController();
