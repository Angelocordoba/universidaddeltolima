import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { LogOut, Check, Search } from "lucide-react";

export default function DashboardVentanilla() {
  const [cedula, setCedula] = useState("");
  const [visitante, setVisitante] = useState(null);

  const buscarVisitante = async () => {
    const { data } = await supabase.from("visitantes").select("*").eq("cedula", cedula).single();
    setVisitante(data || null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Panel Ventanilla</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <div className="bg-white p-5 shadow rounded-xl">
        <h2 className="font-semibold mb-3">Buscar visitante</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Ingrese cédula"
            className="border p-2 rounded flex-1"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <button
            onClick={buscarVisitante}
            className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Search size={18} /> Buscar
          </button>
        </div>

        {visitante ? (
          <div className="p-4 border rounded bg-green-50">
            <p><strong>Nombre:</strong> {visitante.nombre}</p>
            <p><strong>Destino:</strong> {visitante.destino}</p>
            <p><strong>Fecha última visita:</strong> {new Date(visitante.updated_at).toLocaleString()}</p>
            <button className="mt-3 bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-2">
              <Check size={16} /> Dar ingreso
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Sin resultados</p>
        )}
      </div>
    </div>
  );
}
