import express from "express";
import { supabase } from "../services/supabaseClient.js";

const router = express.Router();

/* ===================================================
   🧩 1️⃣ Obtener todos los usuarios
   =================================================== */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("usuarios").select("*").order("creado_en", { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===================================================
   🧩 2️⃣ Obtener un usuario por ID
   =================================================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("usuarios").select("*").eq("id", id).single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

/* ===================================================
   🧩 3️⃣ Crear un nuevo usuario
   =================================================== */
router.post("/", async (req, res) => {
  try {
    const { correo, contrasena, nombre, dependencia_id, rol } = req.body;

    const { data, error } = await supabase.from("usuarios").insert([
      { correo, contrasena, nombre, dependencia_id, rol }
    ]).select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===================================================
   🧩 4️⃣ Actualizar usuario
   =================================================== */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dependencia_id, rol } = req.body;

    const { data, error } = await supabase.from("usuarios").update({
      nombre,
      dependencia_id,
      rol
    }).eq("id", id).select();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===================================================
   🧩 5️⃣ Eliminar usuario
   =================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("usuarios").delete().eq("id", id);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
