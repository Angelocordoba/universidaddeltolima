import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { LogOut, Plus, Database } from "lucide-react";

export default function DashboardAdmin() {
  const [dependencias, setDependencias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const fetchDependencias = async () => {
    const { data } = await supabase.from("dependencias").select("*");
    setDependencias(data || []);
  };

  const crearDependencia = async (e) => {
    e.preventDefault();
    await supabase.from("dependencias").insert([{ nombre, email }]);
    setNombre("");
    setEmail("");
    fetchDependencias();
  };

  useEffect(() => {
    fetchDependencias();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          Panel General — Secretaría General
        </h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={crearDependencia}
        className="bg-white p-5 shadow rounded-xl mb-6 flex gap-4"
      >
        <input
          type="text"
          placeholder="Nombre dependencia"
          className="border rounded p-2 flex-1"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo dependencia"
          className="border rounded p-2 flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> Crear
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-3">Dependencias registradas</h2>
      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Fecha registro</th>
          </tr>
        </thead>
        <tbody>
          {dependencias.map((d) => (
            <tr key={d.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{d.nombre}</td>
              <td className="p-3">{d.email}</td>
              <td className="p-3">
                {new Date(d.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Database size={18} /> Exportar datos a Excel
        </button>
      </div>
    </div>
  );
}
