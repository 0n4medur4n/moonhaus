// Plantillas de email para Moonhaus Valencia
// Usando Montserrat y el esquema de colores morado de la marca

const baseStyles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Montserrat', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f8f9fa;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #9e57ff 0%, #6139b6 50%, #8a2be2 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .tagline {
      font-size: 14px;
      font-weight: 300;
      opacity: 0.9;
      letter-spacing: 1px;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    .message {
      font-size: 16px;
      font-weight: 400;
      color: #555555;
      line-height: 1.8;
      margin-bottom: 25px;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, rgba(158, 87, 255, 0.1) 0%, rgba(97, 57, 182, 0.1) 100%);
      border-left: 4px solid #9e57ff;
      padding: 20px;
      margin: 25px 0;
      border-radius: 8px;
    }
    
    .contact-info {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .contact-info h3 {
      color: #9e57ff;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    
    .contact-detail {
      margin-bottom: 10px;
      font-size: 14px;
    }
    
    .contact-detail strong {
      color: #2c3e50;
      font-weight: 600;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #9e57ff 0%, #6139b6 100%);
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 20px 0;
      transition: all 0.3s ease;
    }
    
    .footer {
      background-color: #2c3e50;
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .footer-content {
      font-size: 14px;
      line-height: 1.6;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-links a {
      color: #9e57ff;
      text-decoration: none;
      margin: 0 10px;
      font-weight: 500;
    }
    
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #9e57ff, transparent);
      margin: 30px 0;
      border-radius: 2px;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 8px;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .logo {
        font-size: 28px;
      }
      
      .greeting {
        font-size: 20px;
      }
      
      .message {
        font-size: 15px;
      }
    }
  </style>
`;

// Plantilla para notificación al administrador
const adminNotificationTemplate = (data) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Contacto - Moonhaus Valencia</title>
  ${baseStyles}
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">MOONHAUS</div>
      <div class="tagline">Coworking Inclusivo Valencia</div>
    </div>
    
    <div class="content">
      <div class="greeting">🌙 Nuevo Contacto Recibido</div>
      
      <div class="message">
        Has recibido una nueva solicitud de contacto desde el formulario web de Moonhaus Valencia.
      </div>
      
      <div class="contact-info">
        <h3>Información del Contacto</h3>
        <div class="contact-detail">
          <strong>Nombre:</strong> ${data.name}
        </div>
        <div class="contact-detail">
          <strong>Email:</strong> ${data.email}
        </div>
        <div class="contact-detail">
          <strong>Teléfono:</strong> ${data.phone}
        </div>
        <div class="contact-detail">
          <strong>Fecha:</strong> ${data.timestamp}
        </div>
      </div>
      
      <div class="highlight-box">
        <h3 style="color: #9e57ff; margin-bottom: 15px;">Mensaje:</h3>
        <p style="font-style: italic; color: #555;">"${data.message}"</p>
      </div>
      
      <div class="message">
        <strong>Próximos pasos:</strong><br>
        • Responder al contacto en menos de 24 horas<br>
        • Verificar disponibilidad de espacios<br>
        • Agendar visita si es necesario<br>
        • Actualizar CRM con la información
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <strong>Moonhaus Valencia</strong><br>
        Calle de Castellón 15, Ruzafa<br>
        Valencia, España<br>
        <br>
        <div class="social-links">
          <a href="mailto:moonhaus.web@gmail.com">Email</a> |
          <a href="https://moonhaus.es">Web</a> |
          <a href="https://instagram.com/moonhausvalencia">Instagram</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Plantilla de confirmación para el usuario
const userConfirmationTemplate = (data) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación - Moonhaus Valencia</title>
  ${baseStyles}
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">MOONHAUS</div>
      <div class="tagline">Donde la creatividad y la diversidad florecen</div>
    </div>
    
    <div class="content">
      <div class="greeting">¡Hola ${data.name}! 👋</div>
      
      <div class="message">
        Gracias por contactar con <strong>Moonhaus Valencia</strong>. Hemos recibido tu mensaje y nos pondremos en contacto contigo en menos de 24 horas.
      </div>
      
      <div class="highlight-box">
        <h3 style="color: #9e57ff; margin-bottom: 15px;">Tu mensaje:</h3>
        <p style="font-style: italic; color: #555;">"${data.message}"</p>
      </div>
      
      <div class="message">
        Mientras tanto, te invitamos a conocer más sobre nuestros espacios creativos e inclusivos en el corazón de Ruzafa, Valencia.
      </div>
      
      <div class="divider"></div>
      
      <div class="message">
        <strong>¿Qué hace especial a Moonhaus?</strong><br><br>
        🎨 <strong>Espacios creativos:</strong> Diseñados para inspirar y conectar<br>
        🌈 <strong>Inclusión real:</strong> Diversidad, familias, artistas y profesionales<br>
        🚀 <strong>Comunidad vibrante:</strong> Networking y colaboración<br>
        📍 <strong>Ubicación premium:</strong> En el corazón creativo de Ruzafa
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://moonhaus.es" class="cta-button">Descubre Moonhaus</a>
      </div>
      
      <div class="message">
        <strong>Nuestro equipo te contactará pronto para:</strong><br>
        • Resolver todas tus dudas<br>
        • Mostrarte nuestros espacios disponibles<br>
        • Agendar una visita personalizada<br>
        • Ayudarte a encontrar el espacio perfecto para tu proyecto
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <strong>Moonhaus Valencia</strong><br>
        Calle de Castellón 15, Ruzafa<br>
        46004 Valencia, España<br>
        <br>
        📧 moonhaus.web@gmail.com<br>
        🌐 moonhaus.es<br>
        <br>
        <div class="social-links">
          <a href="https://instagram.com/moonhausvalencia">Instagram</a> |
          <a href="https://linkedin.com/company/moonhausvalencia">LinkedIn</a> |
          <a href="https://facebook.com/moonhausvalencia">Facebook</a>
        </div>
        <br>
        <small style="opacity: 0.8;">
          Este email fue enviado porque contactaste con nosotros a través de moonhaus.es<br>
          Si no solicitaste esta información, puedes ignorar este mensaje.
        </small>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Plantilla de prueba
const testTemplate = (data) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email - Moonhaus Backend</title>
  ${baseStyles}
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">MOONHAUS</div>
      <div class="tagline">Test Email - Backend Funcionando</div>
    </div>
    
    <div class="content">
      <div class="greeting">🧪 Email de Prueba</div>
      
      <div class="message">
        Este es un email de prueba para verificar que el backend de Moonhaus Valencia está funcionando correctamente.
      </div>
      
      <div class="highlight-box">
        <h3 style="color: #9e57ff; margin-bottom: 15px;">Información del Test:</h3>
        <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        <p><strong>Servicio:</strong> Gmail SMTP</p>
        <p><strong>Estado:</strong> ✅ Funcionando correctamente</p>
      </div>
      
      <div class="message">
        Si recibes este email, significa que:
        <br><br>
        ✅ La configuración de Gmail SMTP es correcta<br>
        ✅ Las plantillas HTML se renderizan bien<br>
        ✅ El backend está listo para recibir formularios<br>
        ✅ Los emails llegan correctamente a destino
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <strong>Moonhaus Valencia - Backend Test</strong><br>
        Sistema de emails funcionando correctamente
      </div>
    </div>
  </div>
</body>
</html>
`;

// Función principal para obtener plantillas
const getEmailTemplate = (type, data) => {
  switch (type) {
    case "admin-notification":
      return adminNotificationTemplate(data);
    case "user-confirmation":
      return userConfirmationTemplate(data);
    case "test":
      return testTemplate(data);
    default:
      throw new Error(`Plantilla de email no encontrada: ${type}`);
  }
};

module.exports = {
  getEmailTemplate,
};
