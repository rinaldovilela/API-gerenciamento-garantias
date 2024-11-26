const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use um serviço SMTP apropriado
  auth: {
    user: process.env.EMAIL_USER, // Definido no .env
    pass: process.env.EMAIL_PASS, // Definido no .env
  },
});

async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    await transporter.sendMail({
      from: '"Gestão de Garantias" <no-reply@garantias.com>',
      to: destinatario,
      subject: assunto,
      text: mensagem,
    });
    console.log(`E-mail enviado para ${destinatario}`);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

module.exports = { enviarEmail };
