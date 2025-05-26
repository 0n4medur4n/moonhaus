import React from "react";
import { useTranslation } from "react-i18next";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

// Global style to fix box-sizing issues
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

// Sección principal con gradiente moderno e imagen de fondo parallax
const LiveSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background-image: url("/backgrounds/backgroundliveMoonhaus.jpg");
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: auto;
    background-attachment: scroll;
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
    background: linear-gradient(
      135deg,
      rgba(15, 5, 30, 0.32) 0%,
      rgba(35, 15, 60, 0.27) 50%,
      rgba(25, 10, 45, 0.85) 100%
    );
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 30% 20%,
        rgba(138, 43, 226, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(75, 0, 130, 0.06) 0%,
        transparent 50%
      );
    z-index: 1;
  }
`;

// Contenedor de contenido centrado
const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 4rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    max-width: 95%;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem;
    border-radius: 16px;
    max-width: 90%;
  }

  @media (max-width: 360px) {
    padding: 2rem 1rem;
    border-radius: 12px;
  }
`;

// Título principal elegante
const Title = styled(motion.h2)`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 300;
  color: white;
  margin-bottom: 2.5rem;
  letter-spacing: 0.02em;
  line-height: 1.2;
  word-wrap: break-word;
  hyphens: auto;

  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
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

// Descripción con tipografía optimizada
const Description = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  font-weight: 300;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    line-height: 1.6;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    font-size: clamp(1rem, 3vw, 1.1rem);
    line-height: 1.5;
  }
`;

// Pregunta destacada con diseño único
const Question = styled(motion.div)`
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.95);
  font-style: italic;
  margin: 3rem auto;
  padding: 2rem;
  max-width: 750px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
  hyphens: auto;

  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 2rem auto;
    max-width: 100%;
    font-size: clamp(1.1rem, 3vw, 1.3rem);
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    margin: 1.5rem auto;
    border-radius: 12px;
    font-size: clamp(1rem, 4vw, 1.2rem);
    line-height: 1.5;
  }

  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1.5rem;
    font-size: 4rem;
    color: rgba(138, 43, 226, 0.3);
    font-family: serif;
    line-height: 1;
    z-index: -1;

    @media (max-width: 768px) {
      font-size: 3rem;
      top: -0.3rem;
      left: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 2.5rem;
      top: -0.2rem;
      left: 0.8rem;
    }
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -2rem;
    right: 1.5rem;
    font-size: 4rem;
    color: rgba(138, 43, 226, 0.3);
    font-family: serif;
    line-height: 1;
    z-index: -1;

    @media (max-width: 768px) {
      font-size: 3rem;
      bottom: -1.5rem;
      right: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 2.5rem;
      bottom: -1.2rem;
      right: 0.8rem;
    }
  }
`;

// Conclusión con énfasis visual
const Conclusion = styled(motion.p)`
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 400;
  color: white;
  margin: 3rem auto 3.5rem;
  max-width: 600px;
  letter-spacing: 0.02em;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.3;

  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media (max-width: 768px) {
    margin: 2rem auto 2.5rem;
    max-width: 100%;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  @media (max-width: 480px) {
    margin: 1.5rem auto 2rem;
    font-size: clamp(1.3rem, 5vw, 1.8rem);
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
`;

// Componente principal
const Live: React.FC = () => {
  const { t } = useTranslation();

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

  const questionVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const conclusionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <GlobalStyle />
      <LiveSection>
        <ContentContainer
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Title variants={itemVariants}>{t("liveMoonhaus.title")}</Title>
          <Description variants={itemVariants}>
            {t("liveMoonhaus.description")}
          </Description>
          <Question
            variants={questionVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("liveMoonhaus.question")}
          </Question>
          <Conclusion
            variants={conclusionVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.7 }}
          >
            {t("liveMoonhaus.conclusion")}
          </Conclusion>
        </ContentContainer>
      </LiveSection>
    </>
  );
};

export default Live;
