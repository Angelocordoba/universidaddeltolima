import QRCode from "qrcode";

// Ejemplo para generar QR
export async function generarQR(url, formato = "png") {
  if (formato === "svg") {
    return await QRCode.toString(url, { type: "svg" });
  } else {
    // PNG como DataURL
    return await QRCode.toDataURL(url);
  }
}

// Uso:
// const qrPNG = await generarQR("https://mi-universidad.com/evento?token=abcd1234");
// const qrSVG = await generarQR("https://mi-universidad.com/evento?token=abcd1234", "svg");
