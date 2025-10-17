import { useLocation, useNavigate } from "react-router-dom";

export default function ExitoRegistro() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.qr) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ¡Registro Exitoso!
        </h2>
        <p className="mb-4 text-gray-700">
          Gracias <strong>{state.nombre}</strong>.  
          Presenta este código QR al ingresar a la Universidad.
        </p>
        <img src={state.qr} alt="Código QR" className="mx-auto mb-6 w-56 h-56" />
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Registrar otro visitante
        </button>
      </div>
    </div>
  );
}
