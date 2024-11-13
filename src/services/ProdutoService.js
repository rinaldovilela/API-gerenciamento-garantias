const ProdutoRepository = require("../repositories/ProdutoRepository");
const GarantiaRepository = require("../repositories/GarantiaRepository"); // Repositório de Garantia
const moment = require("moment");

class ProdutoService {
  async registrarProduto(produtoData) {
    // Validar os dados do produto
    const valida = this.validarProduto(produtoData);
    if (!valida.isValid) {
      throw new Error(valida.message); // Lança um erro se a validação falhar
    }

    const produto = await ProdutoRepository.create(produtoData);

    // Gerar garantia automaticamente
    const garantiaData = {
      produtoId: produto._id,
      dataInicio: produto.dataCompra,
      dataFim: moment(produto.dataCompra)
        .add(produto.garantiaMeses, "months")
        .toDate(),
      status: "ativa", // Garantia ativa ao ser criada
    };

    // Criar a garantia no banco
    await GarantiaRepository.create(garantiaData);

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

  // Função de validação do produto
  validarProduto(produtoData) {
    if (!produtoData.nome || produtoData.nome.trim() === "") {
      return { isValid: false, message: "O nome do produto é obrigatório" };
    }
    if (!produtoData.categoria || produtoData.categoria.trim() === "") {
      return { isValid: false, message: "A categoria é obrigatória" };
    }
    if (!produtoData.fabricante || produtoData.fabricante.trim() === "") {
      return { isValid: false, message: "O fabricante é obrigatório" };
    }
    if (!produtoData.dataCompra || isNaN(Date.parse(produtoData.dataCompra))) {
      return { isValid: false, message: "A data de compra é inválida" };
    }
    if (!produtoData.garantiaMeses || produtoData.garantiaMeses <= 0) {
      return {
        isValid: false,
        message: "A garantia deve ser um número inteiro positivo",
      };
    }

    return { isValid: true, message: "Produto válido" }; // Retorna um objeto indicando que o produto é válido
  }
}

module.exports = new ProdutoService();
