const ProdutoRepository = require("../repositories/ProdutoRepository");

class ProdutoService {
  async registrarProduto(produtoData) {
    const produto = await ProdutoRepository.create(produtoData);
    return produto;
  }

  async listarProdutos() {
    return await ProdutoRepository.findAll();
  }

  async obterProduto(produtoId) {
    return await ProdutoRepository.findById(produtoId);
  }

  async atualizarProduto(produtoId, updateData) {
    return await ProdutoRepository.update(produtoId, updateData);
  }

  async deletarProduto(produtoId) {
    return await ProdutoRepository.delete(produtoId);
  }
}

module.exports = new ProdutoService();
