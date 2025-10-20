import express from "express";
import { supabase } from "../services/supabaseClient.js";

const router = express.Router();


// ===========================================================
// 🏢 Dependencias
// ===========================================================

// Listar dependencias
router.get("/dependencias", async (req, res) => {
  const { data, error } = await supabase.from("dependencias").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Crear dependencia
router.post("/dependencias", async (req, res) => {
  const { nombre, descripcion } = req.body;
  const { data, error } = await supabase
    .from("dependencias")
    .insert([{ nombre, descripcion }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Dependencia creada", dependencia: data[0] });
});

// Editar dependencia
router.put("/dependencias/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const { error } = await supabase
    .from("dependencias")
    .update({ nombre, descripcion })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Dependencia actualizada" });
});

// Eliminar dependencia
router.delete("/dependencias/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("dependencias").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Dependencia eliminada" });
});


// ===========================================================
// 👥 Usuarios
// ===========================================================

// Listar usuarios
router.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("id, correo, nombre, rol, dependencia_id, creado_en");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Crear usuario
router.post("/usuarios", async (req, res) => {
  const { correo, contrasena, nombre, rol, dependencia_id } = req.body;
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ correo, contrasena, nombre, rol, dependencia_id }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Usuario creado", usuario: data[0] });
});

// Actualizar rol o dependencia
router.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { rol, dependencia_id } = req.body;
  const { error } = await supabase
    .from("usuarios")
    .update({ rol, dependencia_id })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Usuario actualizado" });
});

// Eliminar usuario
router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Usuario eliminado" });
});


// ===========================================================
// 🧾 Logs / Bitácora
// ===========================================================
router.get("/logs", async (req, res) => {
  const { data, error } = await supabase
    .from("bitacora")
    .select("*")
    .order("creado_en", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
