import express from "express";
import { supabase } from "../services/supabaseClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Obtener todas las dependencias
 */
router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase.from("dependencias").select("*").order("nombre", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/**
 * Crear una nueva dependencia
 */
router.post("/", verifyToken, async (req, res) => {
  const { nombre, encargado, correo } = req.body;

  const { data, error } = await supabase
    .from("dependencias")
    .insert([{ nombre, encargado, correo }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

/**
 * Obtener una dependencia por ID
 */
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("dependencias").select("*").eq("id", id).single();

  if (error) return res.status(404).json({ error: "Dependencia no encontrada" });
  res.json(data);
});

export default router;
