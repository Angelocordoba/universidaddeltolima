const API_URL = "https://universidaddeltolima.onrender.com/api/registros";

export async function buscarVisitante(cedula) {
  const res = await fetch(`${API_URL}/buscar/${cedula}`);
  if (!res.ok) throw new Error("No encontrado");
  return await res.json();
}

export async function registrarEntrada(qrToken) {
  const res = await fetch(`${API_URL}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: qrToken }),
  });
  if (!res.ok) throw new Error("Error al registrar entrada");
  return await res.json();
}
