# API Sistema de Garantias

## Descrição

Esta API foi desenvolvida para o gerenciamento de produtos e suas respectivas garantias. Ela permite o **cadastro**, **consulta**, **atualização** e **exclusão** de produtos, com a possibilidade de validar e manipular dados importantes como data de compra e duração da garantia. A API utiliza **MongoDB** como banco de dados e é documentada de forma interativa com **Swagger**.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express.js**: Framework minimalista para construção de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados de produtos e garantias.
- **Mongoose**: Biblioteca para interagir com o MongoDB de forma simplificada.
- **Swagger**: Ferramenta para documentação interativa da API.
- **Express Validator**: Middleware para validação de dados de entrada.
- **dotenv**: Biblioteca para carregar variáveis de ambiente.
- **Nodemon**: Utilitário para reiniciar o servidor automaticamente durante o desenvolvimento.

## Funcionalidades

### Endpoints

- **POST /api/produtos**: Cria um novo produto com informações sobre nome, categoria, fabricante, data de compra e garantia.
- **GET /api/produtos**: Retorna a lista de todos os produtos cadastrados.
- **GET /api/produtos/:id**: Retorna um produto específico pelo ID.
- **PUT /api/produtos/:id**: Atualiza as informações de um produto específico pelo ID.
- **DELETE /api/produtos/:id**: Exclui um produto específico pelo ID.

### Validações

A API utiliza o **express-validator** para garantir que os dados de entrada sejam válidos. Alguns exemplos de validação:

- O nome do produto não pode ser vazio.
- A categoria do produto deve ser preenchida.
- A data de compra deve estar no formato **ISO8601**.
- A garantia deve ser um número inteiro positivo.

### Documentação Swagger

A API está totalmente documentada usando **Swagger**, permitindo que desenvolvedores visualizem os endpoints e testem a API diretamente no navegador.

- A documentação Swagger está disponível em: `/api-docs`

## Instruções de Uso

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **MongoDB** (ou uma instância de banco de dados MongoDB na nuvem)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/api-sistema-garantias.git
   cd api-sistema-garantias
