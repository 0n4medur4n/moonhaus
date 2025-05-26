const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Error específico de validación
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Datos de entrada inválidos";
  }

  // Error de rate limiting
  if (err.status === 429) {
    statusCode = 429;
    message = "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.";
  }

  // Error de HubSpot
  if (err.message && err.message.includes("HubSpot")) {
    console.error("HubSpot Error:", err);
    // No exponer detalles internos de HubSpot al cliente
    message = "Error interno del servicio. El mensaje se envió correctamente.";
  }

  // Error de email
  if (err.message && err.message.includes("nodemailer")) {
    console.error("Email Error:", err);
    message = "Error al enviar el email. Por favor intenta de nuevo.";
  }

  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
