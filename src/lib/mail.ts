import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom = process.env.EMAIL_FROM || "LivraisonExpress <no-reply@livraisonexpress.fr>";

function createTransporter() {
  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort ? parseInt(smtpPort, 10) : 587,
      secure: smtpPort === "465",
      auth: { user: smtpUser, pass: smtpPass },
    });
  }

  // Aucun SMTP configuré : mode développement, les e-mails sont simulés
  // (générés mais non envoyés) et journalisés dans la console du serveur.
  return nodemailer.createTransport({ jsonTransport: true });
}

export async function sendMail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({ from: emailFrom, to, subject, html, text });
    if (!smtpHost) {
      console.log(`[email] Aucun SMTP configuré (voir .env) — e-mail simulé pour ${to} : "${subject}"`);
    } else {
      console.log(`[email] E-mail envoyé à ${to} : "${subject}"`);
    }
  } catch (error) {
    console.error(`[email] Échec de l'envoi à ${to} :`, error);
  }
}
