#!/usr/bin/env node

/**
 * Script de prueba para verificar servicios de Moonhaus Backend
 * Uso: node scripts/test-services.js
 */

require("dotenv").config();
const {
  verifyEmailConfig,
  sendTestEmail,
} = require("../services/emailService");
const {
  verifyHubSpotConfig,
  testHubSpotConnection,
} = require("../services/hubspotService");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const log = (color, message) => {
  console.log(`${color}${message}${colors.reset}`);
};

const testEmailService = async () => {
  log(colors.cyan, "\n🧪 Probando servicio de Email...");

  try {
    // Verificar configuración
    const isConfigured = await verifyEmailConfig();
    if (!isConfigured) {
      log(colors.red, "❌ Configuración de email inválida");
      return false;
    }

    // Enviar email de prueba
    log(colors.blue, "📧 Enviando email de prueba...");
    await sendTestEmail();
    log(colors.green, "✅ Email de prueba enviado correctamente");

    return true;
  } catch (error) {
    log(colors.red, `❌ Error en servicio de email: ${error.message}`);
    return false;
  }
};

const testHubSpotService = async () => {
  log(colors.cyan, "\n🧪 Probando servicio de HubSpot...");

  try {
    // Verificar configuración
    const isConfigured = await verifyHubSpotConfig();
    if (!isConfigured) {
      log(colors.yellow, "⚠️ HubSpot no configurado (opcional)");
      return true; // No es crítico
    }

    // Probar conexión (comentado para evitar crear contactos de prueba)
    // log(colors.blue, '🔗 Probando conexión con HubSpot...');
    // await testHubSpotConnection();
    log(colors.green, "✅ HubSpot configurado correctamente");

    return true;
  } catch (error) {
    log(colors.yellow, `⚠️ Error en HubSpot (no crítico): ${error.message}`);
    return true; // HubSpot es opcional
  }
};

const testEnvironmentVariables = () => {
  log(colors.cyan, "\n🧪 Verificando variables de entorno...");

  const requiredVars = [
    "GMAIL_USER",
    "GMAIL_APP_PASSWORD",
    "ADMIN_EMAIL",
    "FROM_EMAIL",
    "FROM_NAME",
  ];

  const optionalVars = ["HUBSPOT_ACCESS_TOKEN", "FRONTEND_URL", "PORT"];

  let allRequired = true;

  // Verificar variables requeridas
  requiredVars.forEach((varName) => {
    if (process.env[varName]) {
      log(colors.green, `✅ ${varName}: Configurado`);
    } else {
      log(colors.red, `❌ ${varName}: Faltante`);
      allRequired = false;
    }
  });

  // Verificar variables opcionales
  optionalVars.forEach((varName) => {
    if (process.env[varName]) {
      log(colors.green, `✅ ${varName}: Configurado`);
    } else {
      log(colors.yellow, `⚠️ ${varName}: No configurado (opcional)`);
    }
  });

  return allRequired;
};

const main = async () => {
  log(
    colors.magenta,
    colors.bright + "🌙 MOONHAUS VALENCIA - TEST DE SERVICIOS"
  );
  log(colors.magenta, "=".repeat(50));

  const startTime = Date.now();

  // Test 1: Variables de entorno
  const envOk = testEnvironmentVariables();

  // Test 2: Servicio de email
  const emailOk = await testEmailService();

  // Test 3: Servicio de HubSpot
  const hubspotOk = await testHubSpotService();

  // Resumen
  const endTime = Date.now();
  const duration = endTime - startTime;

  log(colors.cyan, "\n📊 RESUMEN DE PRUEBAS:");
  log(colors.cyan, "=".repeat(30));

  log(
    envOk ? colors.green : colors.red,
    `Variables de entorno: ${envOk ? "OK" : "ERROR"}`
  );
  log(
    emailOk ? colors.green : colors.red,
    `Servicio de email: ${emailOk ? "OK" : "ERROR"}`
  );
  log(
    hubspotOk ? colors.green : colors.yellow,
    `Servicio de HubSpot: ${hubspotOk ? "OK" : "WARNING"}`
  );

  const allOk = envOk && emailOk && hubspotOk;

  log(colors.cyan, `\n⏱️ Tiempo total: ${duration}ms`);

  if (allOk) {
    log(
      colors.green,
      colors.bright +
        "\n🎉 ¡Todos los servicios están funcionando correctamente!"
    );
    log(
      colors.green,
      "✅ El backend está listo para recibir formularios de contacto"
    );
    process.exit(0);
  } else {
    log(colors.red, colors.bright + "\n❌ Algunos servicios tienen problemas");
    log(
      colors.yellow,
      "⚠️ Revisa la configuración antes de usar en producción"
    );
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on("unhandledRejection", (reason, promise) => {
  log(colors.red, `❌ Error no manejado: ${reason}`);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  log(colors.red, `❌ Excepción no capturada: ${error.message}`);
  process.exit(1);
});

// Ejecutar pruebas
main().catch((error) => {
  log(colors.red, `❌ Error fatal: ${error.message}`);
  process.exit(1);
});
