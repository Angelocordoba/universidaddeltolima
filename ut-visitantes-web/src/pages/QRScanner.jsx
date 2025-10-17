import { useState } from "react";
import { useZxing } from "react-zxing";
import { registrarEntrada } from "../services/registrosService";
import { useNavigate } from "react-router-dom";

export default function QRScanner() {
  const [resultado, setResultado] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { ref } = useZxing({
    onDecodeResult: async (result) => {
      const codigo = result.getText();
      setResultado("Procesando...");
      try {
        const res = await registrarEntrada(codigo);
        setResultado(`✅ Entrada registrada para ${res.nombre}`);
      } catch (err) {
        console.error(err);
        setError("❌ Código no válido o ya registrado.");
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-4">Escaneo de QR</h2>

      <div className="bg-white p-2 rounded-lg mb-4 w-80 h-80 overflow-hidden">
        <video ref={ref} style={{ width: "100%", height: "100%" }} />
      </div>

      {resultado && <p className="text-green-400 text-center">{resultado}</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}

      <button
        onClick={() => navigate("/ventanilla")}
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-xl"
      >
        Volver
      </button>
    </div>
  );
}
