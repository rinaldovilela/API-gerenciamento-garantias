const ProdutoRepository = require("../repositories/ProdutoRepository");
const GarantiaRepository = require("../repositories/GarantiaRepository");
const ClienteRepository = require("../repositories/ClienteRepository");
const { enviarEmail } = require("../services/emailService");

class ProdutoService {
  // Lista produtos com garantias associadas
  async listarProdutosComGarantias() {
    return await ProdutoRepository.findAll();
  }

  // Registra um produto e notifica o cliente
  async registrarProduto(produtoData, clienteId) {
    // Valida os dados do produto
    const valida = this.validarProduto(produtoData);
    if (!valida.isValid) throw new Error(valida.message);

    // Cria o produto
    const produto = await ProdutoRepository.create({
      ...produtoData,
      clienteId,
    });

    // Associa o produto ao cliente
    await ClienteRepository.update(clienteId, {
      $push: { produtos: produto._id },
    });

    // Cria a garantia automaticamente
    const garantiaData = {
      produtoId: produto._id,
      clienteId: clienteId,
      dataInicio: produtoData.dataCompra,
      dataFim: new Date(
        new Date(produtoData.dataCompra).setMonth(
          new Date(produtoData.dataCompra).getMonth() +
            produtoData.garantiaMeses
        )
      ),
      status: "ativa",
    };

    const garantia = await GarantiaRepository.create(garantiaData);

    // Adiciona a garantia ao array de garantias do produto
    produto.garantias.push(garantia._id);
    await produto.save();

    // Notifica o cliente via e-mail
    const cliente = await ClienteRepository.findById(clienteId);
    if (cliente) {
      const mensagem = `
        Olá, ${cliente.nome}!

        O produto "${
          produto.nome
        }" foi registrado com sucesso no sistema de garantias.
        Detalhes da garantia:
        - Data de Início: ${garantia.dataInicio.toLocaleDateString()}

        - Data de Expiração: ${garantia.dataFim.toLocaleDateString()}

        - Status: ${garantia.status}

        Atenciosamente,
        Equipe de Gestão de Garantias

        SOFTEX PERNAMBUCO
      `;
      await enviarEmail(
        cliente.email,
        "Produto Registrado com Sucesso!",
        mensagem
      );
    }

    return produto;
  }

  // Lista todos os produtos
  async listarProdutos() {
    return await ProdutoRepository.findAll();
  }

  // Obtém um produto pelo ID
  async obterProduto(produtoId) {
    return await ProdutoRepository.findById(produtoId);
  }

  // Atualiza um produto pelo ID
  async atualizarProduto(produtoId, updateData) {
    return await ProdutoRepository.update(produtoId, updateData);
  }

  // Deleta um produto e as garantias associadas
  async deletarProduto(produtoId) {
    const produto = await ProdutoRepository.findById(produtoId);
    if (!produto) throw new Error("Produto não encontrado");

    // Remove as garantias associadas ao produto
    await GarantiaRepository.deleteMany({ produtoId: produto._id });

    // Remove o produto do array de produtos do cliente
    await ClienteRepository.update(produto.clienteId, {
      $pull: { produtos: produto._id },
    });

    // Remove o próprio produto
    return await ProdutoRepository.delete(produtoId);
  }

  // Valida os dados do produto
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
