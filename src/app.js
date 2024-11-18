const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const garantiaRoutes = require("./routes/garantiaRoutes");

const app = express();
app.use(bodyParser.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema de Garantias",
      version: "1.0.0",
      description: "API para gerenciamento de produtos e garantias",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", garantiaRoutes, produtoRoutes);
app.use("/api/clientes", clienteRoutes);



module.exports = app;
