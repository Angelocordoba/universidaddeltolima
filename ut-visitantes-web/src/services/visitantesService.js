const API_URL = "https://universidaddeltolima.onrender.com/api/visitantes";

export async function registrarVisitante(datos) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) throw new Error("Error al registrar visitante");
  return await res.json();
}
