import React from "react";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "organization" | "localBusiness" | "event" | "service" | "faq";
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseUrl = "https://moonhaus.es";

    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Moonhaus Valencia",
          alternateName: "Moonhaus",
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description:
            "Coworking inclusivo en Valencia donde creativos, familias y profesionales encuentran un espacio artístico y colaborativo en Ruzafa.",
          foundingDate: "2024",
          founders: [
            {
              "@type": "Person",
              name: "Natalia",
              jobTitle: "Arquitecta",
              nationality: "Colombian",
            },
            {
              "@type": "Person",
              name: "Camilo",
              jobTitle: "Experto en gestión",
              nationality: "Canadian",
            },
            {
              "@type": "Person",
              name: "Doriam",
              jobTitle: "Diseñadora y creativa",
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calle de Castellón 15",
            addressLocality: "Ruzafa",
            addressRegion: "Valencia",
            postalCode: "46004",
            addressCountry: "ES",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+34-XXX-XXX-XXX",
            contactType: "customer service",
            email: "info@moonhaus.es",
            availableLanguage: ["Spanish", "English"],
          },
          sameAs: [
            "https://www.instagram.com/moonhausvalencia",
            "https://www.linkedin.com/company/moonhausvalencia",
            "https://www.facebook.com/moonhausvalencia",
          ],
        };

      case "localBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "CoworkingSpace",
          name: "Moonhaus Valencia",
          image: `${baseUrl}/og-image.jpg`,
          description:
            "Coworking inclusivo en Valencia donde creativos, familias y profesionales encuentran un espacio artístico y colaborativo.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calle de Castellón 15",
            addressLocality: "Ruzafa",
            addressRegion: "Valencia",
            postalCode: "46004",
            addressCountry: "ES",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 39.4699,
            longitude: -0.3763,
          },
          url: baseUrl,
          telephone: "+34-643-927-561",
          email: "moonhaus.web@gmail.com",
          priceRange: "€€",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "08:00",
              closes: "20:00",
            },
          ],
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "WiFi",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Meeting Rooms",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Art Workshops",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Family Friendly",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Inclusive Environment",
              value: true,
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Espacios de Coworking",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Sala Venus",
                  description:
                    "Sala de juntas y taller para artes mixtas. Capacidad: 8 personas.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Orion",
                  description:
                    "Microoficina privada para 1 persona con todas las comodidades.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Antares",
                  description:
                    "Oficina flexible para 2 personas con espacio colaborativo.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Salón Satélite",
                  description:
                    "Salón principal para eventos culturales y actividades privadas.",
                },
              },
            ],
          },
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Coworking Inclusivo Moonhaus",
          description:
            "Espacios de coworking inclusivos para creativos, familias y profesionales en Valencia.",
          provider: {
            "@type": "Organization",
            name: "Moonhaus Valencia",
          },
          areaServed: {
            "@type": "City",
            name: "Valencia",
            addressCountry: "ES",
          },
          serviceType: "Coworking Space",
          offers: {
            "@type": "Offer",
            description: "Espacios de trabajo flexibles y creativos",
            priceRange: "€€",
          },
        };

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Qué hace especial a Moonhaus?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Moonhaus es un coworking inclusivo donde la igualdad, la colaboración y el respeto son el día a día. Aquí, hombres, mujeres, personas LGTBI+, familias, artistas y emprendedores comparten un entorno abierto y creativo.",
              },
            },
            {
              "@type": "Question",
              name: "¿Dónde está ubicado Moonhaus?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Moonhaus está ubicado en Calle de Castellón 15, Ruzafa, Valencia, España. Una zona vibrante y creativa de la ciudad.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué espacios ofrece Moonhaus?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ofrecemos Sala Venus (sala de juntas y taller de artes), Orion (microoficina privada), Antares (oficina para 2 personas) y Salón Satélite (eventos culturales).",
              },
            },
            {
              "@type": "Question",
              name: "¿Cuándo abre Moonhaus?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Moonhaus está en construcción y abrirá sus puertas muy pronto. Las plazas son limitadas, por lo que recomendamos reservar con anticipación.",
              },
            },
          ],
        };

      default:
        return data || {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
