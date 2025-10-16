import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { Plus, LogOut } from "lucide-react";

export default function DashboardProfesor() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");

  const fetchEstudiantes = async () => {
    const { data } = await supabase.from("estudiantes").select("*");
    setEstudiantes(data || []);
  };

  const registrarEstudiante = async (e) => {
    e.preventDefault();
    await supabase.from("estudiantes").insert([{ nombre, curso }]);
    setNombre("");
    setCurso("");
    fetchEstudiantes();
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Panel Profesor</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={registrarEstudiante}
        className="bg-white p-5 shadow rounded-xl mb-6 flex gap-3"
      >
        <input
          type="text"
          placeholder="Nombre estudiante"
          className="border rounded p-2 flex-1"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          className="border rounded p-2 flex-1"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> Registrar
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-3">Estudiantes registrados</h2>
      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Curso</th>
            <th className="p-3 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{e.nombre}</td>
              <td className="p-3">{e.curso}</td>
              <td className="p-3">
                {new Date(e.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
