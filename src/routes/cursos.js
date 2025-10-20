import express from "express";
import supabase from "../services/supabaseClient.js";
import { randomBytes } from "crypto";
import csvParser from "csv-parser";
import fs from "fs";

const router = express.Router();


// 🧱 Crear curso
router.post("/crear", async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, profesor_id, cupos } = req.body;
  const { data, error } = await supabase
    .from("cursos")
    .insert([{ nombre, descripcion, fecha_inicio, fecha_fin, profesor_id, cupos }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Curso creado", curso: data[0] });
});


// 🧱 Matricular estudiantes manualmente
router.post("/matricular", async (req, res) => {
  const { curso_id, estudiantes } = req.body; // [{cedula, nombre, correo, telefono}]
  const { data, error } = await supabase
    .from("curso_estudiantes")
    .insert(estudiantes.map(e => ({ ...e, curso_id })))
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Estudiantes matriculados", data });
});


// 🧱 Subir estudiantes por CSV
router.post("/matricular_csv", async (req, res) => {
  const { curso_id, filePath } = req.body; // path temporal del CSV subido
  const estudiantes = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      estudiantes.push({
        curso_id,
        cedula: row.cedula,
        nombre: row.nombre,
        correo: row.correo,
        telefono: row.telefono
      });
    })
    .on("end", async () => {
      const { data, error } = await supabase
        .from("curso_estudiantes")
        .insert(estudiantes)
        .select();

      if (error) return res.status(400).json({ error: error.message });
      res.json({ message: "Estudiantes importados desde CSV", data });
    });
});


// 🧱 Generar pase temporal (QR)
router.post("/generar_pase", async (req, res) => {
  const { estudiante_id } = req.body;

  const token = randomBytes(16).toString("hex");
  const { data: estudiante, error: estErr } = await supabase
    .from("curso_estudiantes")
    .select("curso_id")
    .eq("id", estudiante_id)
    .single();

  if (estErr) return res.status(400).json({ error: estErr.message });

  const { data: curso, error: cursoErr } = await supabase
    .from("cursos")
    .select("fecha_fin")
    .eq("id", estudiante.curso_id)
    .single();

  if (cursoErr) return res.status(400).json({ error: cursoErr.message });

  const { data, error } = await supabase
    .from("curso_pases")
    .upsert([
      {
        estudiante_id,
        pass_token: token,
        estado: "activo",
        fecha_expiracion: curso.fecha_fin
      }
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Pase temporal generado", token });
});


// 🧱 Validar pase (QR o cédula)
router.post("/validar_pase", async (req, res) => {
  const { token, cedula } = req.body;

  let query = supabase
    .from("vista_pases_activos")
    .select("*");

  if (token) query = query.eq("pass_token", token);
  else if (cedula) query = query.eq("cedula", cedula);
  else return res.status(400).json({ error: "Falta token o cédula" });

  const { data, error } = await query.single();

  if (error || !data) return res.status(404).json({ error: "Pase no válido o expirado" });
  res.json({ message: "Pase válido ✅", data });
});

export default router;
