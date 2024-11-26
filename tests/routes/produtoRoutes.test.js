const request = require("supertest");
const app = require("../../src/app");
const ProdutoRepository = require("../../src/repositories/ProdutoRepository");

// Mockando as funções do ProdutoRepository
jest.mock("../../src/repositories/ProdutoRepository");

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe("Testando a rota POST /api/produtos", () => {
  it("deve criar um novo produto", async () => {
    jest.setTimeout(10000);

    const novoProduto = {
      nome: "Smartphone X",
      categoria: "Eletrônicos",
      fabricante: "Marca Y",
      dataCompra: "2023-11-12",
      garantiaMeses: 12,
    };

    // Mockando a criação do produto
    ProdutoRepository.create.mockResolvedValue(novoProduto);

    const response = await request(app).post("/api/produtos").send(novoProduto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("nome", novoProduto.nome);
  });
});
