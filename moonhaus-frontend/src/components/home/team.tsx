import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

// Animación para las estrellas
const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
  }
`;

const TeamSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding: 6rem 2rem;
  color: #fff;
  background: linear-gradient(
    135deg,
    #0a0b1b 0%,
    rgb(27, 11, 43) 50%,
    rgb(36, 12, 57) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Star = styled.div<{
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.8);
  opacity: ${() => Math.random() * 0.5 + 0.3};
  animation: ${pulseGlow} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const TeamContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: clamp(0.2rem, 1vw, 0.6rem);
  margin-bottom: 3.5rem;
  background: linear-gradient(135deg, #ffffff, #f2e6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  max-width: 800px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
  position: relative;

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CardContainer = styled.div`
  position: relative;
  height: 420px;

  @media (max-width: 768px) {
    height: 380px;
  }

  @media (max-width: 480px) {
    height: 400px;
  }
`;

const MemberCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

// ARREGLADO: Uso shouldForwardProp para evitar que bgImg llegue al DOM
const MemberImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgImg",
})<{ bgImg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.bgImg})`};
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const CardGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
`;

const MemberInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlassContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
  background: linear-gradient(135deg, #ffffff, #f2e6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const MemberDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
`;

const TeamFooter = styled(motion.div)`
  max-width: 800px;
  text-align: center;
  margin-top: 2rem;
`;

const TeamFooterText = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
`;

const teamMembers = [
  {
    id: 1,
    image: "/team/natalia.jpg",
    nameKey: "team.members.natalia.name",
    descriptionKey: "team.members.natalia.description",
  },
  {
    id: 2,
    image: "/team/camilo.jpg",
    nameKey: "team.members.camilo.name",
    descriptionKey: "team.members.camilo.description",
  },
  {
    id: 3,
    image: "/team/doriam.jpg",
    nameKey: "team.members.doriam.name",
    descriptionKey: "team.members.doriam.description",
  },
];

const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;

    stars.push(
      <Star
        key={`star-${i}`}
        size={size}
        top={top}
        left={left}
        duration={duration}
        delay={delay}
      />
    );
  }
  return stars;
};

const Team: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <TeamSection ref={sectionRef} id="team">
      <StarryBackground>{generateStars(150)}</StarryBackground>

      <TeamContent>
        <TeamTitle
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          {t("team.title")}
        </TeamTitle>

        <motion.div
          style={{
            opacity: gridOpacity,
            scale: gridScale,
            width: "100%",
          }}
        >
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.2 + 0.3,
                  },
                }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <CardContainer>
                  <MemberCard>
                    <MemberImage bgImg={member.image} />
                    <CardGradient />
                    <MemberInfo>
                      <GlassContainer>
                        <MemberName>{t(member.nameKey)}</MemberName>
                        <MemberDescription>
                          {t(member.descriptionKey)}
                        </MemberDescription>
                      </GlassContainer>
                    </MemberInfo>
                  </MemberCard>
                </CardContainer>
              </motion.div>
            ))}
          </TeamGrid>
        </motion.div>

        <TeamFooter
          style={{
            y: footerY,
            opacity: footerOpacity,
          }}
        >
          <TeamFooterText>{t("team.footer")}</TeamFooterText>
        </TeamFooter>
      </TeamContent>
    </TeamSection>
  );
};

export default Team;
