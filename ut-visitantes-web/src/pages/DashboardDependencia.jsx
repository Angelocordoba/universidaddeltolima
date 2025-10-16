import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { Calendar, Users, Plus, Edit2, Trash2, LogOut } from "lucide-react";

export default function DashboardDependencia() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    cupos_max: 0,
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [editando, setEditando] = useState(null);

  // 🔹 Cargar eventos
  const fetchEventos = async () => {
    const { data, error } = await supabase.from("eventos").select("*").order("created_at", { ascending: false });
    if (error) console.error(error);
    setEventos(data || []);
  };

  // 🔹 Crear evento
  const crearEvento = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("eventos").insert([{
      ...form,
      dependencia_id: "TU_DEPENDENCIA_ID", // ⚠️ Cambia luego para que venga del login
    }]);

    if (error) alert("Error al crear el evento");
    else {
      alert("✅ Evento creado exitosamente");
      setForm({ nombre: "", descripcion: "", cupos_max: 0, fecha_inicio: "", fecha_fin: "" });
      fetchEventos();
    }
    setLoading(false);
  };

  // 🔹 Eliminar evento
  const eliminarEvento = async (id) => {
    if (!confirm("¿Eliminar este evento?")) return;
    await supabase.from("eventos").delete().eq("id", id);
    fetchEventos();
  };

  // 🔹 Editar evento
  const editarEvento = async (e) => {
    e.preventDefault();
    await supabase.from("eventos").update(form).eq("id", editando);
    alert("✅ Evento actualizado");
    setEditando(null);
    setForm({ nombre: "", descripcion: "", cupos_max: 0, fecha_inicio: "", fecha_fin: "" });
    fetchEventos();
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Panel Dependencia</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={editando ? editarEvento : crearEvento}
        className="bg-white p-5 shadow rounded-xl mb-6 flex flex-wrap gap-3"
      >
        <input
          type="text"
          placeholder="Nombre del evento"
          className="border rounded p-2 flex-1"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Cupos"
          className="border rounded p-2 w-32"
          value={form.cupos_max}
          onChange={(e) => setForm({ ...form, cupos_max: e.target.value })}
          required
        />
        <input
          type="date"
          className="border rounded p-2"
          value={form.fecha_inicio}
          onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })}
          required
        />
        <input
          type="date"
          className="border rounded p-2"
          value={form.fecha_fin}
          onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          className="border rounded p-2 w-full"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <button
          disabled={loading}
          className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> {editando ? "Actualizar evento" : "Crear evento"}
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-3">Eventos activos</h2>
      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Evento</th>
            <th className="p-3 text-left">Cupos</th>
            <th className="p-3 text-left">Inicio</th>
            <th className="p-3 text-left">Fin</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{e.nombre}</td>
              <td className="p-3">
                {e.cupos_ocupados}/{e.cupos_max}
              </td>
              <td className="p-3">{new Date(e.fecha_inicio).toLocaleDateString()}</td>
              <td className="p-3">{new Date(e.fecha_fin).toLocaleDateString()}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => {
                    setEditando(e.id);
                    setForm(e);
                  }}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button
                  onClick={() => eliminarEvento(e.id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
