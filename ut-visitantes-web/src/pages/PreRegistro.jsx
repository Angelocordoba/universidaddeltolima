import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarVisitante } from "../services/visitantesService";

export default function PreRegistro() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    correo: "",
    telefono: "",
    evento_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registrarVisitante(formData);
      navigate("/exito", { state: { qr: data.qr, nombre: formData.nombre } });
    } catch (err) {
      setError("No se pudo completar el preregistro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Preregistro de Visitantes
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="cedula"
            type="text"
            placeholder="Cédula"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="telefono"
            type="tel"
            placeholder="Teléfono"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="evento_id"
            type="text"
            placeholder="Código del evento (opcional)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl"
          >
            {loading ? "Registrando..." : "Enviar Preregistro"}
          </button>
        </form>
      </div>
    </div>
  );
}
