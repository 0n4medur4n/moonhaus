const express = require("express");
const { body, validationResult } = require("express-validator");
const { sendContactEmail } = require("../services/emailService");
const { createHubSpotContact } = require("../services/hubspotService");

const router = express.Router();

// Validaciones para el formulario de contacto
const contactValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Debe proporcionar un email válido")
    .isLength({ max: 254 })
    .withMessage("El email es demasiado largo"),

  body("phone")
    .trim()
    .isLength({ min: 9, max: 15 })
    .withMessage("El teléfono debe tener entre 9 y 15 caracteres")
    .matches(/^[\+]?[0-9\s\-\(\)]+$/)
    .withMessage(
      "El teléfono solo puede contener números, espacios, guiones y paréntesis"
    ),

  body("message")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("El mensaje debe tener entre 10 y 1000 caracteres"),
];

// POST /api/contact - Enviar formulario de contacto
router.post("/", contactValidation, async (req, res, next) => {
  try {
    console.log("📥 Datos recibidos:", req.body);

    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Errores de validación:", errors.array());
      return res.status(400).json({
        success: false,
        error: "Datos inválidos",
        details: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { name, email, phone, message } = req.body;

    // Datos del contacto
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    };

    console.log("📧 Procesando solicitud de contacto:", {
      name: contactData.name,
      email: contactData.email,
    });

    // Promesas para ejecutar en paralelo
    const promises = [];

    // 1. Enviar email
    promises.push(
      sendContactEmail(contactData).catch((err) => {
        console.error("Error enviando email:", err);
        throw new Error("Error al enviar el email de confirmación");
      })
    );

    // 2. Crear contacto en HubSpot (solo si está configurado)
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      promises.push(
        createHubSpotContact(contactData).catch((err) => {
          console.error("Error en HubSpot:", err);
          // No fallar si HubSpot falla, solo loggear
          return null;
        })
      );
    }

    // Ejecutar ambas operaciones
    const results = await Promise.allSettled(promises);

    // Verificar si el email se envió correctamente
    const emailResult = results[0];
    if (emailResult.status === "rejected") {
      throw emailResult.reason;
    }

    // Log del resultado de HubSpot
    if (results[1]) {
      const hubspotResult = results[1];
      if (hubspotResult.status === "fulfilled" && hubspotResult.value) {
        console.log("✅ Contacto creado en HubSpot:", hubspotResult.value.id);
      } else {
        console.log(
          "⚠️ HubSpot no disponible o falló (email enviado correctamente)"
        );
      }
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message:
        "¡Gracias por contactarnos! Te responderemos en menos de 24 horas.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en ruta de contacto:", error);
    next(error);
  }
});

// GET /api/contact/test - Endpoint de prueba
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API de contacto funcionando correctamente",
    timestamp: new Date().toISOString(),
    services: {
      email: process.env.GMAIL_USER ? "Configurado" : "No configurado",
      hubspot: process.env.HUBSPOT_ACCESS_TOKEN
        ? "Configurado"
        : "No configurado",
    },
  });
});

module.exports = router;
