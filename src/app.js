import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import eventoRoutes from "./routes/eventos.js";
import visitanteRoutes from "./routes/visitantes.js";
import dependenciaRoutes from "./routes/dependencias.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/visitantes", visitanteRoutes);
app.use("/api/dependencias", dependenciaRoutes);

app.get("/", (req, res) => res.send("✅ API UT Visitantes corriendo"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
