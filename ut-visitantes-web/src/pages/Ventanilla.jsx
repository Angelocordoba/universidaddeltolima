import { useState } from "react";
import { buscarVisitante, registrarEntrada } from "../services/registrosService";
import { useNavigate } from "react-router-dom";

export default function Ventanilla() {
  const [cedula, setCedula] = useState("");
  const [visitante, setVisitante] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    setLoading(true);
    setMensaje("");
    try {
      const data = await buscarVisitante(cedula);
      setVisitante(data);
    } catch {
      setMensaje("Visitante no encontrado o sin preregistro.");
      setVisitante(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await registrarEntrada(visitante.token);
      setMensaje(`✅ Entrada registrada para ${visitante.nombre}`);
      setVisitante(null);
    } catch {
      setMensaje("Error al registrar la entrada.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Ventanilla / Vigilancia</h1>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Cédula del visitante"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={handleBuscar}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {visitante && (
          <div className="border p-4 rounded-lg mb-4 bg-gray-50">
            <p><strong>Nombre:</strong> {visitante.nombre}</p>
            <p><strong>Evento:</strong> {visitante.evento}</p>
            <p><strong>Estado:</strong> {visitante.estado}</p>
            <button
              onClick={handleCheckIn}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              Registrar Entrada
            </button>
          </div>
        )}

        {mensaje && (
          <p className="text-center text-sm mt-2 text-gray-700">{mensaje}</p>
        )}

        <button
          onClick={() => navigate("/escaner")}
          className="mt-6 w-full bg-gray-800 hover:bg-black text-white py-2 rounded-xl"
        >
          📷 Escanear QR
        </button>
      </div>
    </div>
  );
}
