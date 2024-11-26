const schedule = require("node-schedule");
const GarantiaRepository = require("../repositories/GarantiaRepository");
const ClienteRepository = require("../repositories/ClienteRepository");
const { enviarEmail } = require("../services/emailService");

async function verificarGarantias() {
  const hoje = new Date();
  const vinteDiasParaExpirar = new Date();
  vinteDiasParaExpirar.setDate(hoje.getDate() + 20);

  try {
    // Buscar garantias que expiram dentro de 20 dias
    const garantias = await GarantiaRepository.findAll();

    const garantiasParaNotificar = garantias.filter((garantia) => {
      const dataFim = new Date(garantia.dataFim);
      const diasRestantes = Math.ceil((dataFim - hoje) / (1000 * 60 * 60 * 24));
      return (
        diasRestantes > 0 && diasRestantes <= 20 && diasRestantes % 5 === 0
      );
    });

    for (const garantia of garantiasParaNotificar) {
      // Buscar informações do cliente associado
      const cliente = await ClienteRepository.findById(garantia.clienteId);

      if (cliente) {
        const mensagem = `
          Olá, ${cliente.nome}!

          A garantia do produto "${garantia.produtoId}" está prestes a expirar!
          Data de Expiração: ${garantia.dataFim.toLocaleDateString()}

          Caso precise de suporte ou renovação, entre em contato.

          Atenciosamente,
          Equipe de Gestão de Garantias
        `;

        await enviarEmail(
          cliente.email,
          "Sua Garantia Está Prestes a Expirar",
          mensagem
        );
      }
    }
  } catch (error) {
    console.error("Erro ao verificar garantias:", error);
  }
}

// Agendar para rodar diariamente às 8:00
schedule.scheduleJob("0 8 * * *", verificarGarantias);

module.exports = { verificarGarantias };
