import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const WhySection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
    url("/backgrounds/backgroundHero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin-top: -2px;
`;

const BackgroundEffectsContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
`;

// Anillos luminosos que flotan en el fondo
const LuminousRing = styled(motion.div)<{ size: number; opacity: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, ${(props) => props.opacity});
  box-shadow: 0 0 20px rgba(242, 230, 255, ${(props) => props.opacity});
  pointer-events: none;
`;

// Partículas que flotan
const FloatingParticle = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(242, 230, 255, 0.3) 60%,
    transparent 100%
  );
  pointer-events: none;
`;

// Contenido centrado y responsivo con z-index mayor
const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhyTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: clamp(0.3rem, 1vw, 0.8rem);
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, #f2e6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  width: 100%;
`;

const WhyDescription = styled(motion.p)`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.8;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  text-align: center;
`;

// Asegurarnos de que el botón CTAButton sea clickeable
const CTAButton = styled(motion(Link))`
  display: inline-block;
  background: transparent;
  color: #fff;
  padding: clamp(0.7rem, 1vw, 1rem) clamp(2rem, 3vw, 3rem);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  margin-top: 2rem;
  font-size: clamp(0.8rem, 1vw, 1rem);
  letter-spacing: clamp(0.1rem, 0.2vw, 0.2rem);
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  cursor: pointer !important;
  position: relative;
  z-index: 20;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  }
`;

// Modificar el GradientOverlay para crear mejor transición con el Hero
const GradientOverlay = styled(motion.div)`
  position: absolute;
  top: -300px; /* Se extiende mucho más hacia arriba para eliminar la línea visible */
  left: 0;
  width: 100%;
  height: 600px; /* Mayor altura para una transición más gradual */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
  z-index: 0;
`;

// Añadir un segundo gradiente en la parte inferior
const BottomGradient = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
  z-index: 0;
`;

// Nueva capa para el efecto parallax avanzado
const ParallaxLayer = styled(motion.div)<{ depth: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

// Elemento decorativo de líneas para animar
const DecorativeLine = styled(motion.div)<{ width: number; angle: number }>`
  position: absolute;
  width: ${(props) => props.width}px;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform-origin: center;
`;

// Componente principal
const Why: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Configuración del scroll para animaciones
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animaciones de parallax para diferentes elementos
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Animación de entrada/salida para contenido
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["50px", "0px", "0px", "-50px"]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  // Overlay con efecto avanzado
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [1, 0.3, 0.3, 1]
  );

  // Rotación sutil para elementos de fondo
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const generateRings = (count: number) => {
    const rings = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 200 + 150;
      const opacity = Math.random() * 0.2 + 0.1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Factor de parallax único para cada anillo
      const parallaxFactor = Math.random() * 0.4 + 0.1;

      // Punto de aparición específico para cada anillo
      const entryOffset = i * 0.03;
      const ringOpacity = useTransform(
        scrollYProgress,
        [
          0.05 + entryOffset,
          0.2 + entryOffset,
          0.8 - entryOffset,
          0.95 - entryOffset,
        ],
        [0, opacity * 1.5, opacity * 1.5, 0]
      );

      // Escala dependiente del scroll con rebote sutil
      const ringScale = useTransform(
        scrollYProgress,
        [
          0.1 + entryOffset,
          0.2 + entryOffset,
          0.8 - entryOffset,
          0.9 - entryOffset,
        ],
        [0.7, 1 + Math.random() * 0.1, 1 + Math.random() * 0.1, 0.7]
      );

      rings.push(
        <LuminousRing
          key={`ring-${i}`}
          size={size}
          opacity={opacity}
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            x: useTransform(
              scrollYProgress,
              [0, 1],
              [0, 100 * parallaxFactor * (Math.random() - 0.5)]
            ),
            y: useTransform(
              scrollYProgress,
              [0, 1],
              [0, 50 * parallaxFactor * (Math.random() - 0.5)]
            ),
            scale: ringScale,
            opacity: ringOpacity,
            rotate: useTransform(
              scrollYProgress,
              [0, 1],
              [0, (Math.random() * 20 - 10) * parallaxFactor]
            ),
          }}
        />
      );
    }
    return rings;
  };

  // Generar partículas con animaciones
  const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 8 + 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 15 + 20;
      const entryOffset = i * 0.02;

      // Visibilidad con efecto de cascada
      const particleOpacity = useTransform(
        scrollYProgress,
        [
          0.05 + entryOffset,
          0.25 + entryOffset,
          0.75 - entryOffset,
          0.95 - entryOffset,
        ],
        [0, 0.8, 0.8, 0]
      );

      particles.push(
        <FloatingParticle
          key={`particle-${i}`}
          size={size}
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            opacity: particleOpacity,
            filter: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              ["blur(0px)", `blur(${Math.random()}px)`, "blur(0px)"]
            ),
          }}
          animate={{
            x: [0, Math.random() * 70 - 35, 0],
            y: [0, Math.random() * 70 - 35, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            transition: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      );
    }
    return particles;
  };

  const generateLines = (count: number) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const width = Math.random() * 200 + 100;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const angle = Math.random() * 180;
      const entryOffset = i * 0.03;

      const lineOpacity = useTransform(
        scrollYProgress,
        [
          0.1 + entryOffset,
          0.3 + entryOffset,
          0.7 - entryOffset,
          0.9 - entryOffset,
        ],
        [0, 0.3, 0.3, 0]
      );

      const lineWidth = useTransform(
        scrollYProgress,
        [
          0.1 + entryOffset,
          0.3 + entryOffset,
          0.7 - entryOffset,
          0.9 - entryOffset,
        ],
        [width * 0.3, width, width, width * 0.3]
      );

      lines.push(
        <DecorativeLine
          key={`line-${i}`}
          width={width}
          angle={angle}
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            width: lineWidth,
            opacity: lineOpacity,
            rotate: angle,
            x: useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]),
          }}
        />
      );
    }
    return lines;
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  const renderAnimatedText = (text: string) => {
    return text.split(" ").map((word, index) => {
      const isHighlight = index % 4 === 0 && word.length > 3;

      if (isHighlight) {
        return (
          <motion.span
            key={`word-${index}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              color: "#d1c2ed",
              y: 0,
              scale: 1,
              transition: {
                delay: index * 0.03,
                duration: 0.5,
              },
            }}
            viewport={{ once: false, amount: 0.3 }}
            style={{
              display: "inline-block",
              margin: "0 4px",
            }}
          >
            {word}
          </motion.span>
        );
      }

      return <span key={`word-${index}`}>{word} </span>;
    });
  };

  return (
    <WhySection ref={sectionRef} id="why">
      {/* Fondo con parallax */}
      <BackgroundEffectsContainer
        style={{
          y: backgroundY,
          rotate: backgroundRotation,
        }}
      >
        {/* Capa de profundidad 1 */}
        <ParallaxLayer depth={1} style={{ y: layer1Y }}>
          {generateRings(6)}
          {generateLines(8)}
        </ParallaxLayer>

        {/* Capa de profundidad 2 */}
        <ParallaxLayer depth={2} style={{ y: layer2Y }}>
          {generateParticles(20)}
        </ParallaxLayer>

        {/* Capa de profundidad 3 */}
        <ParallaxLayer depth={3} style={{ y: layer3Y }}>
          {generateRings(4)}
          {generateLines(6)}
        </ParallaxLayer>

        <GradientOverlay
          style={{
            opacity: overlayOpacity,
            scaleY: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]),
          }}
        />
        <BottomGradient
          style={{
            scaleY: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]),
          }}
        />
      </BackgroundEffectsContainer>

      <ContentContainer
        style={{
          opacity: contentOpacity,
          y: contentY,
          scale: contentScale,
        }}
      >
        <WhyTitle
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={titleVariants}
        >
          {t("why.title")}
        </WhyTitle>

        <WhyDescription
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={descriptionVariants}
        >
          {renderAnimatedText(t("why.description"))}
        </WhyDescription>

        <CTAButton
          to="/contact"
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.2 }}
          variants={buttonVariants}
          style={{
            position: "relative",
            zIndex: 50,
            pointerEvents: "auto",
          }}
        >
          {t("why.cta")}
        </CTAButton>
      </ContentContainer>
    </WhySection>
  );
};

export default Why;
