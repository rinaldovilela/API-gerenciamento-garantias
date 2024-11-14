const ProdutoRepository = require("../repositories/ProdutoRepository");
const GarantiaRepository = require("../repositories/GarantiaRepository");

class ProdutoService {
  // Função para listar produtos com suas garantias associadas
  async listarProdutosComGarantias() {
    return await ProdutoRepository.findAll(); // Vai usar o método findAll do repositório que já faz o populate
  }

  async registrarProduto(produtoData, clienteId) {
    // Validar os dados do produto
    const valida = this.validarProduto(produtoData);
    if (!valida.isValid) {
      throw new Error(valida.message); // Lança um erro se a validação falhar
    }

    const produto = await ProdutoRepository.create(produtoData);

    // Criar Garantia automaticamente
    const garantiaData = {
      produtoId: produto._id,
      clienteId: clienteId, // Associando ao cliente
      dataInicio: produtoData.dataCompra,
      dataFim: new Date(
        new Date(produtoData.dataCompra).setMonth(
          new Date(produtoData.dataCompra).getMonth() +
            produtoData.garantiaMeses
        )
      ),
    };

    const garantia = await GarantiaRepository.create(garantiaData);

    // Adiciona o ID da garantia no campo garantias do produto
    produto.garantias.push(garantia._id);
    await produto.save(); // Salva o produto com a referência da garantia

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

    return { isValid: true, message: "Produto válido" };
  }
}

module.exports = new ProdutoService();
