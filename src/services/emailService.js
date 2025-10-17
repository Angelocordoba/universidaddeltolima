import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarCorreoInvitacion(destinatario, nombre, qrUrl) {
  const mailOptions = {
    from: `"Universidad del Tolima" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: "Invitación - Registro Universidad del Tolima",
    html: `
      <h2>Hola ${nombre},</h2>
      <p>Tu preregistro fue exitoso. Presenta este código QR al ingresar:</p>
      <img src="${qrUrl}" alt="Código QR" width="200" height="200" />
      <p>Gracias por visitar la Universidad del Tolima.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
