const GarantiaService = require("../services/GarantiaService");

class GarantiaController {
  async registrarGarantia(req, res) {
    try {
      const garantiaData = req.body;
      const novaGarantia = await GarantiaService.criarGarantia(garantiaData);
      res.status(201).json(novaGarantia);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new GarantiaController();
