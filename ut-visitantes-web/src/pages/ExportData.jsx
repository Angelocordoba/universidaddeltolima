import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ExportData() {
  const [vista, setVista] = useState("vista_eventos_resumen");

  const download = (format) => {
    window.open(`/api/export/${format}/${vista}`, "_blank");
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Exportar Datos</h1>
      <select
        value={vista}
        onChange={(e) => setVista(e.target.value)}
        className="border rounded p-2"
      >
        <option value="vista_eventos_resumen">Eventos (Resumen)</option>
        <option value="vista_visitantes_dependencia">Visitantes por dependencia</option>
        <option value="vista_cursos_pases">Cursos y pases</option>
      </select>

      <div className="flex gap-4 mt-4">
        <Button onClick={() => download("csv")}>📄 Exportar CSV</Button>
        <Button onClick={() => download("excel")}>📊 Exportar Excel</Button>
      </div>
    </div>
  );
}
