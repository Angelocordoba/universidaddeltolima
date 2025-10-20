import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    fetch("/api/admin/usuarios").then(r => r.json()).then(setUsuarios);
    fetch("/api/admin/dependencias").then(r => r.json()).then(setDependencias);
    fetch("/api/admin/logs").then(r => r.json()).then(setLogs);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
      <div className="flex gap-4">
        {["usuarios", "dependencias", "logs"].map(tab => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? "default" : "outline"}
          >
            {tab.toUpperCase()}
          </Button>
        ))}
      </div>

      {activeTab === "usuarios" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Correo</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Rol</th>
                  <th className="p-2">Dependencia</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{u.correo}</td>
                    <td className="p-2">{u.nombre}</td>
                    <td className="p-2">{u.rol}</td>
                    <td className="p-2">{u.dependencia_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "dependencias" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Dependencias</h2>
            <ul>
              {dependencias.map(d => (
                <li key={d.id} className="border-b py-2">{d.nombre} — {d.descripcion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {activeTab === "logs" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Bitácora del sistema</h2>
            <ul className="max-h-96 overflow-y-auto text-sm">
              {logs.map(l => (
                <li key={l.id} className="border-b py-1">
                  <strong>{l.accion}</strong> — {l.tabla_afectada}
                  <span className="text-gray-500 text-xs"> ({new Date(l.creado_en).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
