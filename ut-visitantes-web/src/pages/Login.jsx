import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Credenciales incorrectas");
      return;
    }

    // 🔁 Redirigir según rol
    const { data: perfil } = await supabase
      .from("users")
      .select("rol")
      .eq("id", data.user.id)
      .single();

    switch (perfil?.rol) {
      case "superadmin":
        navigate("/admin");
        break;
      case "dependencia":
        navigate("/dependencia");
        break;
      case "ventanilla":
        navigate("/ventanilla");
        break;
      case "vigilancia":
        navigate("/vigilancia");
        break;
      case "profesor":
        navigate("/profesor");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Acceso Visitantes UT
        </h2>

        <input
          type="email"
          placeholder="Correo institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
