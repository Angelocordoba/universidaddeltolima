import express from "express";
import { supabase } from "../services/supabaseClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Obtener todos los eventos (solo autenticados)
router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase.from("eventos").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Crear evento (por dependencia)
router.post("/", verifyToken, async (req, res) => {
  const { nombre, descripcion, cupos_max, fecha_inicio, fecha_fin, dependencia_id } = req.body;
  const { data, error } = await supabase
    .from("eventos")
    .insert([{ nombre, descripcion, cupos_max, fecha_inicio, fecha_fin, dependencia_id }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
