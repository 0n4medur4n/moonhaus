# Moonhaus Valencia - Backend

Backend para el formulario de contacto de Moonhaus Valencia con integración de Gmail SMTP y HubSpot CRM.

## 🚀 Características

- ✅ **Gmail SMTP**: Envío de emails con plantillas HTML elegantes
- ✅ **HubSpot CRM**: Creación automática de contactos y notas
- ✅ **Validación robusta**: Validación de datos de entrada
- ✅ **Rate limiting**: Protección contra spam
- ✅ **Seguridad**: Helmet, CORS, sanitización
- ✅ **Plantillas responsive**: Emails con diseño de Moonhaus
- ✅ **Logging completo**: Monitoreo y debugging

## 📋 Requisitos

- Node.js >= 16.0.0
- npm o yarn
- Cuenta de Gmail con contraseña de aplicación
- Cuenta de HubSpot (opcional, versión gratuita)

## 🛠️ Instalación

1. **Clonar e instalar dependencias:**

```bash
cd moonhaus-backend
npm install
```

2. **Configurar variables de entorno:**

```bash
# Copiar el archivo de ejemplo
cp env.example .env

# Editar .env con tus credenciales
nano .env
```

3. **Configurar Gmail SMTP:**

   - Habilitar autenticación de 2 factores en Gmail
   - Generar contraseña de aplicación
   - Usar la contraseña de aplicación en `GMAIL_APP_PASSWORD`

4. **Configurar HubSpot (opcional):**
   - Crear cuenta gratuita en HubSpot
   - Generar Access Token en Settings > Integrations > API Key
   - Añadir token en `HUBSPOT_ACCESS_TOKEN`

## ⚙️ Configuración

### Variables de Entorno

```env
# Servidor
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173

# Gmail SMTP
GMAIL_USER=moonhaus.web@gmail.com
GMAIL_APP_PASSWORD=oxpq dcqu flem vyle

# HubSpot (opcional)
HUBSPOT_ACCESS_TOKEN=tu_token_aqui

# Emails
ADMIN_EMAIL=moonhaus.web@gmail.com
FROM_EMAIL=moonhaus.web@gmail.com
FROM_NAME=Moonhaus Valencia

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### Configuración de Gmail

1. **Habilitar 2FA en Gmail:**

   - Ve a tu cuenta de Google
   - Seguridad > Verificación en 2 pasos
   - Activa la verificación

2. **Generar contraseña de aplicación:**
   - Seguridad > Contraseñas de aplicaciones
   - Selecciona "Correo" y "Otro"
   - Copia la contraseña generada (16 caracteres)
   - Úsala en `GMAIL_APP_PASSWORD`

### Configuración de HubSpot

1. **Crear cuenta gratuita:**

   - Registrarse en [HubSpot](https://www.hubspot.com)
   - Completar configuración inicial

2. **Generar Access Token:**
   - Settings > Integrations > API Key
   - Create key
   - Copiar el token generado

## 🚀 Uso

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

### Verificar configuración

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/contact/test
```

## 📡 API Endpoints

### Health Check

```
GET /health
```

Respuesta:

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Moonhaus Backend",
  "version": "1.0.0"
}
```

### Test de Configuración

```
GET /api/contact/test
```

Respuesta:

```json
{
  "success": true,
  "message": "API de contacto funcionando correctamente",
  "services": {
    "email": "Configurado",
    "hubspot": "Configurado"
  }
}
```

### Enviar Formulario de Contacto

```
POST /api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34612345678",
  "message": "Estoy interesado en conocer más sobre los espacios de coworking."
}
```

Respuesta exitosa:

```json
{
  "success": true,
  "message": "¡Gracias por contactarnos! Te responderemos en menos de 24 horas.",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📧 Plantillas de Email

### Para el Usuario (Confirmación)

- **Asunto**: "🌙 ¡Gracias por contactar con Moonhaus Valencia!"
- **Contenido**: Confirmación personalizada con información de Moonhaus
- **Diseño**: Responsive con colores de la marca

### Para el Administrador (Notificación)

- **Asunto**: "🌙 Nuevo contacto desde Moonhaus - [Nombre]"
- **Contenido**: Información completa del contacto y próximos pasos
- **Diseño**: Profesional con datos organizados

## 🔗 Integración con HubSpot

### Datos Creados Automáticamente:

- **Contacto**: Con nombre, email, teléfono
- **Propiedades personalizadas**: Fuente, fecha, tipo de interés
- **Nota**: Con mensaje completo y próximos pasos
- **Lead Status**: Marcado como "NEW"

### Campos Mapeados:

- `firstname` / `lastname`: Desde el nombre completo
- `email`: Email del formulario
- `phone`: Teléfono del formulario
- `lead_source`: "Website Contact Form"
- `location_preference`: "Valencia - Ruzafa"
- `interest_type`: "Coworking Space"

## 🛡️ Seguridad

### Medidas Implementadas:

- **Rate Limiting**: 5 requests por 15 minutos por IP
- **Validación**: Sanitización de todos los inputs
- **CORS**: Configurado para dominios específicos
- **Helmet**: Headers de seguridad
- **Logging**: Registro de todas las actividades

### Validaciones del Formulario:

- **Nombre**: 2-100 caracteres, solo letras y espacios
- **Email**: Formato válido, máximo 254 caracteres
- **Teléfono**: Formato español (+34, 6/7/8/9 + 8 dígitos)
- **Mensaje**: 10-1000 caracteres

## 🐛 Debugging

### Logs del Sistema:

```bash
# Ver logs en tiempo real
npm run dev

# Logs incluyen:
# 📧 Procesando solicitud de contacto
# ✅ Emails enviados correctamente
# 🔗 Creando contacto en HubSpot
# ✅ Contacto creado en HubSpot exitosamente
```

### Errores Comunes:

1. **Error de Gmail SMTP:**

   - Verificar contraseña de aplicación
   - Confirmar que 2FA está habilitado
   - Revisar `GMAIL_USER` y `GMAIL_APP_PASSWORD`

2. **Error de HubSpot:**

   - Verificar `HUBSPOT_ACCESS_TOKEN`
   - Confirmar permisos del token
   - El sistema continúa funcionando sin HubSpot

3. **Error de CORS:**
   - Verificar `FRONTEND_URL` en .env
   - Confirmar origen de la request

## 🚀 Despliegue

### Variables de Entorno en Producción:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://moonhaus.es
# ... resto de variables
```

### Consideraciones:

- Usar HTTPS en producción
- Configurar reverse proxy (nginx)
- Monitorear logs y métricas
- Backup de configuración

## 📞 Soporte

Para problemas o preguntas:

- **Email**: moonhaus.web@gmail.com
- **Documentación**: Este README
- **Logs**: Revisar consola del servidor

---

**Moonhaus Valencia** - Donde la creatividad y la diversidad florecen 🌙
