const ProdutoRepository = require("../repositories/ProdutoRepository");
const GarantiaRepository = require("../repositories/GarantiaRepository"); // Repositório de Garantia
const ClienteRepository = require("../repositories/ClienteRepository"); // Repositório de Cliente
const moment = require("moment");

class ProdutoService {
  // Função para registrar o produto e criar a garantia automaticamente
  async registrarProduto(produtoData, clienteId) {
    // Validar os dados do produto
    const valida = this.validarProduto(produtoData);
    if (!valida.isValid) {
      throw new Error(valida.message); // Lança um erro se a validação falhar
    }

    // Criar o produto com a associação ao cliente
    const produto = await ProdutoRepository.create({
      ...produtoData,
      clienteId: clienteId, // Associando o cliente ao produto
    });

    // Criar Garantia automaticamente
    const garantiaData = {
      produtoId: produto._id,
      clienteId: clienteId, // Associando o cliente à garantia
      dataInicio: produtoData.dataCompra,
      dataFim: new Date(
        new Date(produtoData.dataCompra).setMonth(
          new Date(produtoData.dataCompra).getMonth() +
            produtoData.garantiaMeses
        )
      ),
    };

    // Criar a garantia e associar ao produto
    await GarantiaRepository.create(garantiaData);

    // Associar o produto ao cliente, se necessário
    const cliente = await ClienteRepository.findById(clienteId);
    if (cliente) {
      cliente.produtos.push(produto._id); // Adiciona o produto ao cliente
      await cliente.save();
    }

    return produto;
  }

  // Função para listar todos os produtos
  async listarProdutos() {
    return await ProdutoRepository.findAll();
  }

  // Função para obter um produto específico
  async obterProduto(produtoId) {
    return await ProdutoRepository.findById(produtoId);
  }

  // Função para atualizar um produto
  async atualizarProduto(produtoId, updateData) {
    return await ProdutoRepository.update(produtoId, updateData);
  }

  // Função para deletar um produto
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
