const { validationResult } = require("express-validator");
const ProdutoService = require("../services/ProdutoService");

exports.registrarProduto = async (req, res) => {
  // Verificação de erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { clienteId } = req.body; // Recebendo o clienteId da requisição
    if (!clienteId) {
      return res.status(400).json({ error: "O ID do cliente é obrigatório" });
    }
    const produto = await ProdutoService.registrarProduto(req.body, clienteId);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarProdutosComGarantias = async (req, res) => {
  try {
    const produtos = await ProdutoService.listarProdutosComGarantias();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await ProdutoService.listarProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obterProduto = async (req, res) => {
  try {
    const produto = await ProdutoService.obterProduto(req.params.id);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  // Verificação de erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const produto = await ProdutoService.atualizarProduto(
      req.params.id,
      req.body
    );
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    await ProdutoService.deletarProduto(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
