import React from "react";
import { useTranslation } from "react-i18next";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import ShootingStars from "../ui/ShootingStars";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const MapSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: linear-gradient(
    145deg,
    rgb(20, 8, 40) 0%,
    rgb(40, 18, 70) 50%,
    rgb(30, 12, 55) 100%
  );
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 20% 30%,
        rgba(158, 87, 255, 0.07) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(97, 57, 182, 0.09) 0%,
        transparent 50%
      );
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.2;

  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 0.8rem;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 0.6rem;
    font-size: clamp(1.5rem, 6vw, 2rem);
    letter-spacing: 0.01em;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    border-radius: 2px;

    @media (max-width: 480px) {
      width: 60px;
      height: 1.5px;
      bottom: -0.6rem;
    }
  }
`;

// Subtítulo con estilo elegante
const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  line-height: 1.7;
  font-weight: 300;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    font-size: clamp(1rem, 3vw, 1.1rem);
    line-height: 1.5;
  }
`;

const MapInfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

// Contenedor del mapa con efecto glassmorphism
const MapContainer = styled(motion.div)`
  flex: 1;
  height: 450px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 992px) {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
    border-radius: 15px;
  }
`;

// Iframe del mapa de Google
const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// Tarjeta de información con efecto glassmorphism
const InfoCard = styled(motion.div)`
  flex: 0 0 350px;
  padding: 2.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 992px) {
    flex: 1;
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    gap: 1rem;
    border-radius: 15px;
  }
`;

// Dirección con icono
const Address = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;

  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: rgba(158, 87, 255, 0.9);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 0.8rem;
  }
`;

const TransportList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const TransportItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: rgba(158, 87, 255, 0.9);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    gap: 0.8rem;
  }
`;

// Descripción del barrio
const NeighborhoodDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const LocationMap: React.FC = () => {
  const { t } = useTranslation();

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  };

  // Variantes de animación para los elementos
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Variantes de animación para el mapa
  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variantes de animación para la tarjeta de información
  const infoVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // URL de Google Maps para la ubicación del coworking
  const googleMapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.0417550893196!2d-0.37833313623298257!3d39.465049015803015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f355f381141%3A0xeba29feb0d73b264!2sCalle%20de%20Castell%C3%B3n%2C%2015%2C%20Ensanche%2C%2046004%20Valencia!5e0!3m2!1ses!2ses!4v1699889723771!5m2!1ses!2ses";

  return (
    <>
      <GlobalStyle />
      <MapSection>
        <ShootingStars numberOfStars={10} />
        <ContentContainer>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Title variants={itemVariants}>{t("location.title")}</Title>
            <Subtitle variants={itemVariants}>
              {t("location.subtitle")}
            </Subtitle>

            <MapInfoContainer>
              <MapContainer
                variants={mapVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <MapIframe
                  src={googleMapsUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title="Ubicación de Moonhaus Valencia"
                />
              </MapContainer>

              <InfoCard
                variants={infoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Address>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div>{t("location.address")}</div>
                </Address>

                <TransportList>
                  <TransportItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <div>{t("location.transport.metro")}</div>
                  </TransportItem>

                  <TransportItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4a2 2 0 0 0-2 2v10h2"></path>
                      <circle cx="6.5" cy="17.5" r="2.5"></circle>
                      <circle cx="16.5" cy="17.5" r="2.5"></circle>
                    </svg>
                    <div>{t("location.transport.bus")}</div>
                  </TransportItem>

                  <TransportItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <div>{t("location.transport.bike")}</div>
                  </TransportItem>

                  <TransportItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                      <circle cx="6.5" cy="16.5" r="2.5"></circle>
                      <circle cx="16.5" cy="16.5" r="2.5"></circle>
                    </svg>
                    <div>{t("location.transport.car")}</div>
                  </TransportItem>
                </TransportList>
              </InfoCard>
            </MapInfoContainer>

            <NeighborhoodDescription
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              {t("location.neighborhood")}
            </NeighborhoodDescription>
          </motion.div>
        </ContentContainer>
      </MapSection>
    </>
  );
};

export default LocationMap;
