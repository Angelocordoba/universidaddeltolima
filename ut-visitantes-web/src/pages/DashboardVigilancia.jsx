import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { LogOut, QrCode, CheckCircle } from "lucide-react";

export default function DashboardVigilancia() {
  const [preregistros, setPreregistros] = useState([]);

  const fetchPreregistros = async () => {
    const { data } = await supabase
      .from("preregistros")
      .select("*")
      .eq("estado", "pendiente");
    setPreregistros(data || []);
  };

  useEffect(() => {
    fetchPreregistros();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Panel Vigilancia</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <div className="bg-white p-5 shadow rounded-xl">
        <h2 className="font-semibold mb-3">Preregistros pendientes</h2>
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Evento</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {preregistros.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">{p.evento}</td>
                <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <button className="bg-green-700 text-white px-3 py-1 rounded flex items-center gap-2">
                    <CheckCircle size={16} /> Autorizar ingreso
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
