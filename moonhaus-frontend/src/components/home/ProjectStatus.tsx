import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StatusSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  background: linear-gradient(
    145deg,
    rgb(20, 8, 40) 0%,
    rgb(40, 18, 70) 50%,
    rgb(30, 12, 55) 100%
  );
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 10% 30%,
        rgba(158, 87, 255, 0.07) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 85% 70%,
        rgba(97, 57, 182, 0.09) 0%,
        transparent 40%
      );
    z-index: 1;
  }
`;

const StatusContentContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 3.5rem 2.5rem 2rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 3rem 2rem 1.5rem 2rem;
    max-width: 90%;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem 1rem 1.5rem;
  }

  * {
    pointer-events: auto;
  }
`;

const StatusTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 0.03em;
  line-height: 1.25;
  background: linear-gradient(145deg, #ffffff, #e0d0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.7rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 2.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(220, 180, 255, 0.7),
      transparent
    );
    border-radius: 3px;
  }
`;

const StatusDescription = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.75;
  margin-bottom: 1.5rem;
  font-weight: 300;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;

  &:last-of-type {
    margin-bottom: 2.5rem;
  }
`;

const CenteredCTAContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* Efecto de resplandor de fondo */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(158, 87, 255, 0.15) 0%,
      rgba(97, 57, 182, 0.1) 40%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(50px);
    z-index: -1;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }
`;

const PowerfulCTAButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(
    135deg,
    rgba(158, 87, 255, 0.9) 0%,
    rgba(97, 57, 182, 0.9) 50%,
    rgba(138, 43, 226, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #ffffff;
  padding: clamp(8px, 2vw, 12px) clamp(20px, 4vw, 30px);
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  font-size: clamp(10px, 2.2vw, 13px);
  font-weight: 600;
  letter-spacing: clamp(0.5px, 0.3vw, 1px);
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 100;
  pointer-events: auto;
  margin-bottom: 1rem;
  max-width: 85vw;
  min-width: clamp(120px, 25vw, 180px);

  box-shadow: 0 8px 25px rgba(158, 87, 255, 0.3), 0 3px 10px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.2) 30%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(158, 87, 255, 1) 0%,
      rgba(97, 57, 182, 1) 50%,
      rgba(138, 43, 226, 1) 100%
    );
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 35px rgba(158, 87, 255, 0.4),
      0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:hover::before {
    left: 100%;
  }

  &:hover::after {
    width: 120px;
    height: 120px;
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  span {
    position: relative;
    z-index: 2;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 11px;
    letter-spacing: 0.8px;
    margin-bottom: 0.8rem;
    min-width: 140px;
    border-radius: 35px;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 10px;
    letter-spacing: 0.6px;
    min-width: 120px;
    border-radius: 30px;
  }

  @media (max-width: 320px) {
    padding: 6px 16px;
    font-size: 9px;
    letter-spacing: 0.5px;
    min-width: 100px;
    border-radius: 25px;
  }
`;

// TEXTO DE URGENCIA CENTRADO
const UrgencyText = styled(motion.p)`
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin: 0;
  font-weight: 400;
  letter-spacing: 1px;
  font-style: italic;
  max-width: 400px;
`;

const ProjectStatus: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // HANDLER PODEROSO Y FUNCIONAL
  const handlePowerfulClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/contact");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.2,
        ease: "circOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "circOut",
      },
    },
  };

  return (
    <StatusSection>
      {/* CONTENIDO DE TEXTO CENTRADO */}
      <StatusContentContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <StatusTitle variants={itemVariants}>
          {t("projectStatus.title")}
        </StatusTitle>

        <StatusDescription variants={itemVariants}>
          {t("projectStatus.copyLine1")}
        </StatusDescription>
        <StatusDescription variants={itemVariants}>
          {t("projectStatus.copyLine2")}
        </StatusDescription>
      </StatusContentContainer>

      {/* CTA Y URGENCIA CENTRADOS VERTICALMENTE */}
      <CenteredCTAContainer
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: "backOut",
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 15,
          },
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <PowerfulCTAButton
          href="/contact"
          onClick={handlePowerfulClick}
          whileHover={{
            scale: 1.08,
            rotate: [0, -1, 1, 0],
            transition: { duration: 0.3 },
          }}
          whileTap={{
            scale: 1.02,
            transition: { duration: 0.1 },
          }}
        >
          <span>{t("projectStatus.cta")}</span>
        </PowerfulCTAButton>

        <UrgencyText
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          ⚡ Plazas limitadas - ¡No te quedes fuera!
        </UrgencyText>
      </CenteredCTAContainer>
    </StatusSection>
  );
};

export default ProjectStatus;
