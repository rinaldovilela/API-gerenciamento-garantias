const ProdutoService = require("../../src/services/ProdutoService");

describe("ProdutoService - validarProduto", () => {
  it("deve validar um produto corretamente", () => {
    const produtoValido = {
      nome: "Smartphone X",
      categoria: "Eletrônicos",
      fabricante: "Marca Y",
      dataCompra: "2023-11-12",
      garantiaMeses: 12,
    };

    const resultado = ProdutoService.validarProduto(produtoValido);
    expect(resultado.isValid).toBe(true);
  });

  it("deve retornar erro se o nome estiver faltando", () => {
    const produtoInvalido = {
      nome: "",
      categoria: "Eletrônicos",
      fabricante: "Marca Y",
      dataCompra: "2023-11-12",
      garantiaMeses: 12,
    };

    const resultado = ProdutoService.validarProduto(produtoInvalido);
    expect(resultado.isValid).toBe(false);
    expect(resultado.message).toBe("O nome do produto é obrigatório");
  });

  it("deve retornar erro se a categoria estiver faltando", () => {
    const produtoInvalido = {
      nome: "Smartphone X",
      categoria: "",
      fabricante: "Marca Y",
      dataCompra: "2023-11-12",
      garantiaMeses: 12,
    };

    const resultado = ProdutoService.validarProduto(produtoInvalido);
    expect(resultado.isValid).toBe(false);
    expect(resultado.message).toBe("A categoria é obrigatória");
  });

  // Adicione mais testes conforme necessário para os outros campos
});
