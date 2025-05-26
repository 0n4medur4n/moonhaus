const nodemailer = require("nodemailer");
const { getEmailTemplate } = require("../templates/emailTemplates");

// Configurar transporter de Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Verificar configuración del transporter
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Configuración de email verificada correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error en configuración de email:", error.message);
    return false;
  }
};

// Enviar email de contacto
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const { name, email, phone, message, timestamp } = contactData;

    // Email para el administrador (notificación de nuevo contacto)
    const adminEmailOptions = {
      from: {
        name: process.env.FROM_NAME || "Moonhaus Valencia",
        address: process.env.FROM_EMAIL || process.env.GMAIL_USER,
      },
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `🌙 Nuevo contacto desde Moonhaus - ${name}`,
      html: getEmailTemplate("admin-notification", {
        name,
        email,
        phone,
        message,
        timestamp: new Date(timestamp).toLocaleString("es-ES", {
          timeZone: "Europe/Madrid",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }),
    };

    // Email de confirmación para el usuario
    const userEmailOptions = {
      from: {
        name: process.env.FROM_NAME || "Moonhaus Valencia",
        address: process.env.FROM_EMAIL || process.env.GMAIL_USER,
      },
      to: email,
      subject: "🌙 ¡Gracias por contactar con Moonhaus Valencia!",
      html: getEmailTemplate("user-confirmation", {
        name,
        message,
      }),
    };

    // Enviar ambos emails
    console.log("📧 Enviando emails...");

    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(userEmailOptions),
    ]);

    console.log("✅ Emails enviados correctamente:", {
      admin: adminResult.messageId,
      user: userResult.messageId,
    });

    return {
      success: true,
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId,
    };
  } catch (error) {
    console.error("❌ Error enviando emails:", error);
    throw new Error(`Error en servicio de email: ${error.message}`);
  }
};

// Función de prueba para verificar el servicio
const sendTestEmail = async (testEmail = process.env.ADMIN_EMAIL) => {
  try {
    const transporter = createTransporter();

    const testEmailOptions = {
      from: {
        name: process.env.FROM_NAME || "Moonhaus Valencia",
        address: process.env.FROM_EMAIL || process.env.GMAIL_USER,
      },
      to: testEmail,
      subject: "🧪 Test Email - Moonhaus Backend",
      html: getEmailTemplate("test", {
        timestamp: new Date().toLocaleString("es-ES", {
          timeZone: "Europe/Madrid",
        }),
      }),
    };

    const result = await transporter.sendMail(testEmailOptions);
    console.log("✅ Email de prueba enviado:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error enviando email de prueba:", error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  sendTestEmail,
  verifyEmailConfig,
};
