import QRCode from "qrcode";

export async function qrGenerator(contenido) {
  try {
    const qrDataUrl = await QRCode.toDataURL(contenido, { width: 300 });
    return qrDataUrl;
  } catch (error) {
    console.error("Error generando QR:", error);
    throw error;
  }
}
