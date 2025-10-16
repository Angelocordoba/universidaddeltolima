import express from "express";
import supabase from "../services/supabaseClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Obtener todos los visitantes registrados
 */
router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase
    .from("visitantes")
    .select("*")
    .order("fecha_ingreso", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/**
 * Registrar un nuevo visitante
 */
router.post("/", async (req, res) => {
  const { nombre, documento, correo, motivo, destino, dependencia_id } = req.body;

  const { data, error } = await supabase
    .from("visitantes")
    .insert([{ nombre, documento, correo, motivo, destino, dependencia_id }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

/**
 * Obtener visitante por ID
 */
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("visitantes").select("*").eq("id", id).single();

  if (error) return res.status(404).json({ error: "Visitante no encontrado" });
  res.json(data);
});

export default router;
