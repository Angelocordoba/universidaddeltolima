import express from "express";
import { supabase } from "../services/supabaseClient.js";
import { qrGenerator } from "../utils/qrGenerator.js";
import { enviarCorreoInvitacion } from "../services/emailService.js";

const router = express.Router();

// POST /api/visitantes
router.post("/", async (req, res) => {
  try {
    const { cedula, nombre, correo, telefono, evento_id } = req.body;

    // Insertar preregistro (evita duplicado con tu función SQL)
    const { data, error } = await supabase.rpc("registrar_visitante_sin_duplicar", {
      p_cedula: cedula,
      p_nombre: nombre,
      p_correo: correo,
      p_telefono: telefono,
      p_evento_id: evento_id,
    });

    if (error) throw error;

    // Generar token (UUID simple)
    const token = data; // ID devuelto desde Supabase
    const link = `https://universidaddeltolima.onrender.com/confirmar/${token}`;

    // Generar QR con el enlace
    const qr = await qrGenerator(link);

    // Enviar correo
    if (correo) {
      await enviarCorreoInvitacion(correo, nombre, qr);
    }

    res.json({ ok: true, id: token, qr });
  } catch (err) {
    console.error("Error registrando visitante:", err);
    res.status(500).json({ error: err.message });
  }
});
export default router;


