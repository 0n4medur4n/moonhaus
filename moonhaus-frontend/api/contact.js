export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Faltan campos requeridos",
        details: [{ message: "Nombre, email y mensaje son obligatorios" }],
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Email inválido",
        details: [{ message: "Por favor ingresa un email válido" }],
      });
    }

    // Aquí puedes agregar lógica para enviar email
    // Por ejemplo, usando Nodemailer, SendGrid, etc.

    console.log("Nuevo contacto recibido:", { name, email, phone, message });

    // Simular envío exitoso
    res.status(200).json({
      message: "¡Gracias por tu mensaje! Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("Error en API de contacto:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}
