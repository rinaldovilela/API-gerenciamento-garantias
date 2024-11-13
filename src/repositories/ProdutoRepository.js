const Produto = require("../models/produto");

class ProdutoRepository {
  async create(produtoData) {
    return await Produto.create(produtoData);
  }

  async findById(produtoId) {
    return await Produto.findById(produtoId).populate("garantias").exec(); // Populando as garantias associadas
  }

  async findAll() {
    return await Produto.find().populate("garantias").exec(); // Populando as garantias para todos os produtos
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
