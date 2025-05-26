const hubspot = require("@hubspot/api-client");

// Inicializar cliente de HubSpot
const getHubSpotClient = () => {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    throw new Error("HUBSPOT_ACCESS_TOKEN no está configurado");
  }

  return new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  });
};

// Crear contacto en HubSpot
const createHubSpotContact = async (contactData) => {
  try {
    const hubspotClient = getHubSpotClient();

    const { name, email, phone, message, timestamp } = contactData;

    // Preparar propiedades del contacto para HubSpot
    const contactProperties = {
      email: email,
      firstname: name.split(" ")[0], // Primer nombre
      lastname: name.split(" ").slice(1).join(" ") || "", // Resto del nombre como apellido
      phone: phone,
      company: "", // Se puede llenar si el usuario lo proporciona
      website: "",

      // Propiedades personalizadas de Moonhaus
      hs_lead_status: "NEW", // Estado del lead
      lifecyclestage: "lead", // Etapa del ciclo de vida

      // Información adicional
      message: message,
      lead_source: "Website Contact Form",
      lead_source_detail: "moonhaus.es/contact",
      first_contact_date: timestamp,

      // Información de seguimiento
      notes_last_contacted: `Contacto inicial desde formulario web: ${message}`,
      notes_last_activity: `Formulario enviado el ${new Date(
        timestamp
      ).toLocaleDateString("es-ES")}`,

      // Campos específicos de coworking
      interest_type: "Coworking Space", // Tipo de interés
      location_preference: "Valencia - Ruzafa",
      contact_reason: "Information Request",
    };

    // Crear el contacto
    const contactInput = {
      properties: contactProperties,
    };

    console.log("🔗 Creando contacto en HubSpot:", { email, name });

    const response = await hubspotClient.crm.contacts.basicApi.create(
      contactInput
    );

    console.log("✅ Contacto creado en HubSpot exitosamente:", {
      id: response.id,
      email: response.properties.email,
      createdAt: response.createdAt,
    });

    // Crear una nota adicional con el mensaje completo
    await createContactNote(hubspotClient, response.id, contactData);

    return {
      success: true,
      id: response.id,
      hubspotUrl: `https://app.hubspot.com/contacts/${response.id}`,
      createdAt: response.createdAt,
    };
  } catch (error) {
    console.error("❌ Error creando contacto en HubSpot:", error);

    // Si el contacto ya existe, intentar actualizarlo
    if (
      error.status === 409 ||
      error.message.includes("Contact already exists")
    ) {
      console.log("🔄 Contacto ya existe, intentando actualizar...");
      return await updateExistingContact(contactData);
    }

    throw new Error(`Error en HubSpot: ${error.message}`);
  }
};

// Actualizar contacto existente
const updateExistingContact = async (contactData) => {
  try {
    const hubspotClient = getHubSpotClient();
    const { email, message, timestamp } = contactData;

    // Buscar el contacto por email
    const searchRequest = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
    };

    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch(
      searchRequest
    );

    if (searchResponse.results.length === 0) {
      throw new Error("Contacto no encontrado para actualizar");
    }

    const contactId = searchResponse.results[0].id;

    // Actualizar con nueva información
    const updateProperties = {
      notes_last_contacted: `Nuevo contacto desde formulario web: ${message}`,
      notes_last_activity: `Formulario enviado el ${new Date(
        timestamp
      ).toLocaleDateString("es-ES")}`,
      last_contact_date: timestamp,
      hs_lead_status: "NEW", // Marcar como nuevo lead otra vez
    };

    const updateInput = {
      properties: updateProperties,
    };

    await hubspotClient.crm.contacts.basicApi.update(contactId, updateInput);

    // Crear nota con el nuevo mensaje
    await createContactNote(hubspotClient, contactId, contactData);

    console.log("✅ Contacto actualizado en HubSpot:", contactId);

    return {
      success: true,
      id: contactId,
      updated: true,
      hubspotUrl: `https://app.hubspot.com/contacts/${contactId}`,
    };
  } catch (error) {
    console.error("❌ Error actualizando contacto en HubSpot:", error);
    throw error;
  }
};

// Crear nota en el contacto
const createContactNote = async (hubspotClient, contactId, contactData) => {
  try {
    const { name, email, phone, message, timestamp } = contactData;

    const noteContent = `
📧 Nuevo contacto desde moonhaus.es

👤 Información del contacto:
• Nombre: ${name}
• Email: ${email}
• Teléfono: ${phone}
• Fecha: ${new Date(timestamp).toLocaleString("es-ES", {
      timeZone: "Europe/Madrid",
    })}

💬 Mensaje:
"${message}"

🎯 Próximos pasos:
• Responder en menos de 24 horas
• Verificar disponibilidad de espacios
• Agendar visita si es necesario
• Enviar información adicional sobre Moonhaus

📍 Fuente: Formulario de contacto web (moonhaus.es/contact)
    `.trim();

    const noteInput = {
      properties: {
        hs_note_body: noteContent,
        hs_timestamp: new Date(timestamp).getTime(),
      },
      associations: [
        {
          to: {
            id: contactId,
          },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 202, // Nota asociada a contacto
            },
          ],
        },
      ],
    };

    await hubspotClient.crm.objects.notes.basicApi.create(noteInput);
    console.log("📝 Nota creada en HubSpot para contacto:", contactId);
  } catch (error) {
    console.error(
      "⚠️ Error creando nota en HubSpot (no crítico):",
      error.message
    );
    // No lanzar error, la nota es opcional
  }
};

// Verificar configuración de HubSpot
const verifyHubSpotConfig = async () => {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.log("⚠️ HubSpot no configurado (HUBSPOT_ACCESS_TOKEN faltante)");
      return false;
    }

    const hubspotClient = getHubSpotClient();

    // Hacer una llamada simple para verificar la conexión
    await hubspotClient.crm.contacts.basicApi.getPage(1);

    console.log("✅ Configuración de HubSpot verificada correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error en configuración de HubSpot:", error.message);
    return false;
  }
};

// Función de prueba para HubSpot
const testHubSpotConnection = async () => {
  try {
    const testContactData = {
      name: "Test Contact Moonhaus",
      email: "test@moonhaus.es",
      phone: "+34600000000",
      message:
        "Este es un contacto de prueba para verificar la integración con HubSpot.",
      timestamp: new Date().toISOString(),
    };

    const result = await createHubSpotContact(testContactData);
    console.log("✅ Test de HubSpot exitoso:", result);
    return result;
  } catch (error) {
    console.error("❌ Error en test de HubSpot:", error);
    throw error;
  }
};

module.exports = {
  createHubSpotContact,
  verifyHubSpotConfig,
  testHubSpotConnection,
};
