const Produto = require("../models/produto");

class ProdutoRepository {
  async create(produtoData) {
    return await Produto.create(produtoData);
  }

  async findById(produtoId) {
    // Asegure-se de que o populate esteja correto
    return await Produto.findById(produtoId)
      .populate("clienteId")
      .populate("garantias");
  }

  async findAll() {
    // Asegure-se de que o populate esteja correto
    return await Produto.find().populate("clienteId").populate("garantias");
  }

  async update(produtoId, updateData) {
    return await Produto.findByIdAndUpdate(produtoId, updateData, {
      new: true,
    });
  }

  async delete(produtoId) {
    return await Produto.findByIdAndDelete(produtoId);
  }
}

module.exports = new ProdutoRepository();
