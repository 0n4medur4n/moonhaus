import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommunitySection = styled.section`
  position: relative;
  min-height: 100vh;
  height: auto;
  width: 100%;
  background: linear-gradient(
    135deg,
    rgb(20, 5, 35) 0%,
    rgb(45, 25, 70) 50%,
    rgb(30, 15, 50) 100%
  );
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(255, 100, 200, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(100, 200, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(200, 100, 255, 0.08) 0%,
        transparent 50%
      );
    z-index: 1;
  }
`;

const ParticleContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 100, 200, 0.4) 50%,
    transparent 100%
  );
  border-radius: 50%;
  &:nth-child(3n) {
    background: radial-gradient(
      circle,
      rgba(100, 200, 255, 0.8) 0%,
      rgba(100, 255, 200, 0.4) 50%,
      transparent 100%
    );
  }
  &:nth-child(5n) {
    background: radial-gradient(
      circle,
      rgba(200, 100, 255, 0.8) 0%,
      rgba(255, 200, 100, 0.4) 50%,
      transparent 100%
    );
  }
`;

const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: clamp(0.2rem, 0.5vw, 0.6rem);
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #ff64c8 25%,
    rgb(170, 100, 255) 50%,
    #c864ff 75%,
    #ffffff 100%
  );
  background-size: 300% 300%;
  animation: gradientShift 8s ease-in-out infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  position: relative;
  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 100, 200, 0.6),
      transparent
    );
    border-radius: 10px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 1.8rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-8px) rotate(0.5deg);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 15px 40px rgba(138, 43, 226, 0.2);

    @media (max-width: 768px) {
      transform: translateY(-4px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 100, 200, 0.6),
      transparent
    );
    transform: translateX(-50%);
    border-radius: 0 0 10px 10px;

    @media (max-width: 480px) {
      width: 40px;
      height: 2px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 70%
    );
    transition: all 0.4s ease;
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
    bottom: -30%;
  }

  &:nth-child(even) {
    &::before {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(100, 200, 255, 0.6),
        transparent
      );
    }
  }

  &:nth-child(3n) {
    &::before {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(200, 100, 255, 0.6),
        transparent
      );
    }
  }
`;

const FeatureText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.9rem, 1vw, 1rem);
  line-height: 1.6;
  margin: 0;
`;

const FooterText = styled(motion.p)`
  font-size: clamp(1.1rem, 1.4vw, 1.4rem);
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 2.5rem;
  font-style: italic;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 14px 35px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  font-size: clamp(0.9rem, 1vw, 1rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: auto;
  min-width: 200px;

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 11px;
    letter-spacing: 1px;
    min-width: 140px;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 10px;
    letter-spacing: 0.8px;
    min-width: 120px;
  }

  @media (max-width: 320px) {
    padding: 6px 16px;
    font-size: 9px;
    letter-spacing: 0.5px;
    min-width: 100px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);

    @media (max-width: 768px) {
      transform: translateY(-1px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 2;
  &.orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(255, 100, 200, 0.2) 0%,
      rgba(138, 43, 226, 0.1) 50%,
      transparent 80%
    );
  }
  &.orb-2 {
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle,
      rgba(100, 200, 255, 0.2) 0%,
      rgba(43, 138, 226, 0.1) 50%,
      transparent 80%
    );
  }
  &.orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(200, 100, 255, 0.15) 0%,
      rgba(138, 226, 43, 0.08) 50%,
      transparent 80%
    );
  }
`;

const Community: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleCTAClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/contact");
  };

  // Obtener las características con manejo de errores
  const featuresRaw = t("community.features", { returnObjects: true });
  const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];

  return (
    <CommunitySection ref={sectionRef} id="community">
      <ParticleContainer>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </ParticleContainer>

      <GlowOrb
        className="orb-1"
        style={{ top: "15%", left: "8%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <GlowOrb
        className="orb-2"
        style={{ bottom: "12%", right: "12%" }}
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.5, 0.9, 0.5],
          x: [0, -25, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <GlowOrb
        className="orb-3"
        style={{ top: "50%", right: "5%" }}
        animate={{
          scale: [0.8, 1.4, 0.8],
          opacity: [0.3, 0.7, 0.3],
          x: [0, -15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <ContentContainer
        style={{ y, opacity }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Title
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t("community.title")}
        </Title>

        <Subtitle
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {t("community.subtitle")}
        </Subtitle>

        <FeaturesGrid
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature: string, index: number) => (
            <FeatureCard
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureText>{feature}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <FooterText
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {t("community.footer")}
        </FooterText>

        <CTAButton
          href="/contact"
          onClick={handleCTAClick}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{t("community.cta")}</span>
        </CTAButton>
      </ContentContainer>
    </CommunitySection>
  );
};

export default Community;
