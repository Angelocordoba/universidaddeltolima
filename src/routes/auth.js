import express from "express";
import supabase from "../services/supabaseClient.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login de dependencia
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, user: data.user });
});

export default router;
