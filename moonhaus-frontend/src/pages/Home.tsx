import React from "react";
import SEOHead from "../components/seo/SEOHead";
import StructuredData from "../components/seo/StructuredData";
import HeroSection from "../components/home/hero";
import Why from "../components/home/why";
import Team from "../components/home/team";
import Spaces from "../components/home/spaces";
import Community from "../components/home/community";
import Live from "../components/home/Live";
import ProjectStatus from "../components/home/ProjectStatus";
import LocationMap from "../components/home/LocationMap";
import WhatsAppChat from "../components/ui/WhatsAppChat";

const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        url="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Moonhaus Valencia - Coworking Inclusivo",
          description:
            "Página principal de Moonhaus Valencia, coworking inclusivo en Ruzafa donde creativos, familias y profesionales encuentran un espacio artístico y colaborativo.",
          url: "https://moonhaus.es",
          mainEntity: {
            "@type": "CoworkingSpace",
            name: "Moonhaus Valencia",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Calle de Castellón 15",
              addressLocality: "Ruzafa",
              addressRegion: "Valencia",
              postalCode: "46004",
              addressCountry: "ES",
            },
            amenityFeature: [
              "Sala Venus - Sala de juntas y taller para artes mixtas",
              "Orion - Microoficina privada",
              "Antares - Oficina flexible para 2 personas",
              "Salón Satélite - Eventos culturales y actividades privadas",
            ],
          },
        }}
      />

      {/* Datos estructurados adicionales */}
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />
      <StructuredData type="service" />
      <StructuredData type="faq" />

      <div
        className="text-white"
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <HeroSection />
          <div style={{ marginTop: "-20px" }}>
            <Why />
          </div>
          <Team />
        </div>
        <Spaces />
        <Community />
        <Live />
        <LocationMap />
        <ProjectStatus />
        <WhatsAppChat />
      </div>
    </>
  );
};

export default Home;
