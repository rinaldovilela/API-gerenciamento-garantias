const { validationResult } = require("express-validator");
const ClienteService = require("../services/ClienteService");
const Produto = require("../models/produto"); // Importando o modelo Produto

exports.registrarCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const cliente = await ClienteService.registrarCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await ClienteService.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obterCliente = async (req, res) => {
  try {
    const cliente = await ClienteService.obterCliente(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nova função para consultar cliente com produtos associados
exports.obterClienteComProdutos = async (req, res) => {
  try {
    const clienteId = req.params.id;

    // Buscar o cliente
    const cliente = await ClienteService.obterCliente(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Buscar os produtos relacionados ao cliente, populando os dados do cliente
    const produtos = await Produto.find({ clienteId }).populate("clienteId");

    // Retornar o cliente com os produtos associados
    res.status(200).json({ cliente, produtos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const cliente = await ClienteService.atualizarCliente(
      req.params.id,
      req.body
    );
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletarCliente = async (req, res) => {
  try {
    await ClienteService.deletarCliente(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
