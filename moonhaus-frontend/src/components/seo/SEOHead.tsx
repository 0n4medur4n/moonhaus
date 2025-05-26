import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  url,
  type = "website",
  noindex = false,
  structuredData,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const baseUrl = "https://moonhaus.es";

  // URLs alternativas para hreflang
  const alternateUrls = {
    es: url ? `${baseUrl}${url}` : baseUrl,
    en: url ? `${baseUrl}/en${url}` : `${baseUrl}/en`,
  };

  // Metadatos por defecto basados en el storytelling
  const defaultMeta = {
    es: {
      title:
        "Moonhaus Valencia - Coworking Inclusivo en Ruzafa | Creatividad y Diversidad",
      description:
        "Coworking inclusivo en Valencia donde creativos, familias y profesionales encuentran un espacio artístico y colaborativo. Próxima apertura en Ruzafa. ¡Reserva tu lugar!",
      keywords:
        "coworking valencia, coworking ruzafa, espacio creativo valencia, coworking inclusivo, oficinas valencia, coworking familias, espacio colaborativo, moonhaus valencia, coworking artistico, oficinas ruzafa",
    },
    en: {
      title:
        "Moonhaus Valencia - Inclusive Coworking in Ruzafa | Creativity and Diversity",
      description:
        "Inclusive coworking in Valencia where creatives, families and professionals find an artistic and collaborative space. Opening soon in Ruzafa. Reserve your place!",
      keywords:
        "coworking valencia, coworking ruzafa, creative space valencia, inclusive coworking, offices valencia, family coworking, collaborative space, moonhaus valencia, artistic coworking, ruzafa offices",
    },
  };

  const meta =
    defaultMeta[currentLang as keyof typeof defaultMeta] || defaultMeta.es;
  const finalTitle = title || meta.title;
  const finalDescription = description || meta.description;
  const finalKeywords = keywords || meta.keywords;
  const finalUrl = url
    ? alternateUrls[currentLang as keyof typeof alternateUrls]
    : alternateUrls[currentLang as keyof typeof alternateUrls];
  const finalImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Moonhaus Valencia" />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content="ES-VC" />
      <meta name="geo.placename" content="Valencia, España" />
      <meta name="geo.position" content="39.4699;-0.3763" />
      <meta name="ICBM" content="39.4699, -0.3763" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Hreflang para SEO multiidioma */}
      <link rel="alternate" hrefLang="es" href={alternateUrls.es} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.es} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Moonhaus Valencia - Coworking Inclusivo"
      />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Moonhaus Valencia" />
      <meta
        property="og:locale"
        content={currentLang === "es" ? "es_ES" : "en_US"}
      />
      <meta
        property="og:locale:alternate"
        content={currentLang === "es" ? "en_US" : "es_ES"}
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta
        name="twitter:image:alt"
        content="Moonhaus Valencia - Coworking Inclusivo"
      />
      <meta name="twitter:site" content="@moonhausvalencia" />
      <meta name="twitter:creator" content="@moonhausvalencia" />

      {/* Metadatos específicos para negocios locales */}
      <meta
        name="business:contact_data:street_address"
        content="Calle de Castellón 15"
      />
      <meta name="business:contact_data:locality" content="Ruzafa" />
      <meta name="business:contact_data:region" content="Valencia" />
      <meta name="business:contact_data:postal_code" content="46004" />
      <meta name="business:contact_data:country_name" content="España" />

      {/* Schema.org JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Schema.org por defecto para negocio local */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CoworkingSpace",
          name: "Moonhaus Valencia",
          description: finalDescription,
          url: finalUrl,
          logo: `${baseUrl}/logo.png`,
          image: finalImage,
          telephone: "+34-XXX-XXX-XXX",
          email: "info@moonhaus.es",
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
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "20:00",
          },
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
          ],
          priceRange: "€€",
          sameAs: [
            "https://www.instagram.com/moonhausvalencia",
            "https://www.linkedin.com/company/moonhausvalencia",
            "https://www.facebook.com/moonhausvalencia",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
