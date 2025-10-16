const API_URL = "https://universidaddeltolima.onrender.com/"; // backend local

export async function registrarVisitante(data) {
  const response = await fetch(`${API_URL}/api/visitantes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}
