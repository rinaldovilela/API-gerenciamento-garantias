require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./src/app");
const { verificarGarantias } = require("./src/utils/notificationScheduler");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error(err));

verificarGarantias();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
