import express from "express";
import { supabase } from "../services/supabaseClient.js";
import { validarTokenQR } from "../utils/validarTokenQR.js";

const router = express.Router();

// =========================
// 🔍 Buscar visitante por cédula
// =========================
router.get("/buscar/:cedula", async (req, res) => {
  const { cedula } = req.params;

  const { data, error } = await supabase
    .from("preregistros")
    .select("id, nombre, cedula, evento_id, estado, token")
    .eq("cedula", cedula)
    .single();

  if (error || !data) return res.status(404).json({ error: "Visitante no encontrado" });

  // Consulta el nombre del evento
  const { data: evento } = await supabase
    .from("eventos")
    .select("nombre")
    .eq("id", data.evento_id)
    .single();

  res.json({
    ...data,
    evento: evento?.nombre || "Sin evento asociado",
  });
});

// =========================
// ✅ Check-in (desde QR o token)
// =========================
router.post("/checkin", async (req, res) => {
  const { token } = req.body;
  const decoded = validarTokenQR(token);
  if (!decoded) return res.status(400).json({ error: "Token inválido" });

  const { id_preregistro, cedula } = decoded;

  // Verifica preregistro válido
  const { data: preregistro } = await supabase
    .from("preregistros")
    .select("*")
    .eq("id", id_preregistro)
    .single();

  if (!preregistro) return res.status(404).json({ error: "Visitante no encontrado" });
  if (preregistro.estado === "registrado") {
    return res.status(400).json({ error: "Entrada ya registrada" });
  }

  // Inserta registro en tabla registros
  await supabase.from("registros").insert([
    {
      visitante_id: preregistro.id,
      fecha_ingreso: new Date().toISOString(),
      tipo_registro: "entrada",
    },
  ]);

  // Actualiza estado del preregistro
  await supabase
    .from("preregistros")
    .update({ estado: "registrado" })
    .eq("id", preregistro.id);

  res.json({
    nombre: preregistro.nombre,
    cedula: preregistro.cedula,
    evento_id: preregistro.evento_id,
    mensaje: "Entrada registrada correctamente",
  });
});

router.post("/validar-qr", async (req, res) => {
  const { token } = req.body;
  const decoded = validarTokenQR(token);
  if (!decoded) return res.status(401).json({ error: "Token inválido o expirado" });

  res.json({ ok: true, visitante: decoded });
});


export default router;

