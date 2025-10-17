// src/utils/validarTokenQR.js
import jwt from "jsonwebtoken";

/**
 * Valida un token QR recibido desde el escáner o enlace de confirmación.
 * @param {string} token - Token QR o JWT generado para el visitante.
 * @returns {object|null} Datos decodificados o null si el token no es válido.
 */
export function validarTokenQR(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("❌ Error al validar el token QR:", err.message);
    return null;
  }
}
