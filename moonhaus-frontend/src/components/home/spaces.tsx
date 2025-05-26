import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { keyframes } from "styled-components";

const HEADER_AREA_HEIGHT_VH = 25;
const CTA_AREA_HEIGHT_VH = 15;

const SpacesSection = styled.section`
  position: relative;
  height: 600vh;
  width: 100%;
  background: linear-gradient(135deg, rgb(36, 12, 57) 0%, rgb(52, 42, 78) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: none;
`;

const StickyViewport = styled(motion.div)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SpacesHeader = styled(motion.div)`
  position: absolute;
  top: 8vh;
  left: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;
  z-index: 30;
`;

const SpacesTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 300;
  letter-spacing: clamp(0.25rem, 0.8vw, 0.7rem);
  background: linear-gradient(135deg, #ffffff, #f2e6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.75rem;
`;

const SpacesSubtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  max-width: 700px;
  margin: 0 auto 1rem;
  padding: 0 1rem;
`;

const CardsTrackContainer = styled(motion.div)`
  position: absolute;
  top: ${HEADER_AREA_HEIGHT_VH}vh;
  left: 0;
  height: ${100 - HEADER_AREA_HEIGHT_VH - CTA_AREA_HEIGHT_VH}vh;
  display: flex;
  align-items: center;
  width: auto;
  z-index: 10;
`;

const CardPageWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

const SpaceCard = styled(motion.div)`
  width: 60%;
  height: 60%;
  max-width: 800px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 80%;
    height: 65%;
  }
`;

const ParallaxCardBackgroundElement = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  opacity: 0.2;
`;

const CardContent = styled.div`
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 2.2vw, 1.8rem);
  font-weight: 400;
  background: linear-gradient(135deg, #ffffff, #e0d0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.6rem;
  text-align: center;
`;

const CardDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: rgba(255, 255, 255, 0.85);
`;

const DetailItem = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  align-items: flex-start;
`;

const DetailBullet = styled.span`
  margin-right: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
`;

const DetailText = styled.div`
  flex: 1;
  h4 {
    font-size: clamp(0.75rem, 1vw, 0.95rem);
    font-weight: 500;
    margin-bottom: 0.15rem;
    color: rgba(255, 255, 255, 0.9);
  }
  p {
    font-size: clamp(0.65rem, 0.75vw, 0.8rem);
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.75);
  }
`;

const FixedButtonContainer = styled(motion.div)`
  position: fixed;
  bottom: 7vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: auto;
`;

const StyledButtonLink = styled.a`
  display: block;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 12px 30px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer !important;
  text-align: center;
  white-space: nowrap;
  pointer-events: auto;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 11px;
    letter-spacing: 1px;
    min-width: 100px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 10px;
    letter-spacing: 0.5px;
    min-width: 90px;
  }

  @media (max-width: 320px) {
    padding: 6px 12px;
    font-size: 9px;
    letter-spacing: 0.5px;
    min-width: 80px;
  }
`;

const scrollAnim = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  z-index: 10;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    animation: ${scrollAnim} 2s infinite;
  }
`;

interface SpaceCardData {
  id: string;
  bgImage: string;
  titleKey: string;
  details: Array<{
    titleKey: string;
    descriptionKey: string;
  }>;
}

const spacesData: SpaceCardData[] = [
  {
    id: "venus",
    bgImage: "/spaces/venus.jpg",
    titleKey: "spaces.venus.title",
    details: [
      {
        titleKey: "spaces.venus.detail1.title",
        descriptionKey: "spaces.venus.detail1.description",
      },
      {
        titleKey: "spaces.venus.detail2.title",
        descriptionKey: "spaces.venus.detail2.description",
      },
    ],
  },
  {
    id: "orion",
    bgImage: "/spaces/orion.jpg",
    titleKey: "spaces.orion.title",
    details: [
      {
        titleKey: "spaces.orion.detail1.title",
        descriptionKey: "spaces.orion.detail1.description",
      },
      {
        titleKey: "spaces.orion.detail2.title",
        descriptionKey: "spaces.orion.detail2.description",
      },
    ],
  },
  {
    id: "antares",
    bgImage: "/spaces/antares.jpg",
    titleKey: "spaces.antares.title",
    details: [
      {
        titleKey: "spaces.antares.detail1.title",
        descriptionKey: "spaces.antares.detail1.description",
      },
      {
        titleKey: "spaces.antares.detail2.title",
        descriptionKey: "spaces.antares.detail2.description",
      },
    ],
  },
];

const ParallaxCardBackground: React.FC<{
  bgImage: string;
  scrollYProgress: MotionValue<number>;
  alt: string;
}> = ({ bgImage, scrollYProgress, alt }) => {
  const x = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  return (
    <ParallaxCardBackgroundElement
      style={{ backgroundImage: `url(${bgImage})`, x }}
      role="img"
      aria-label={alt}
    />
  );
};

const Spaces: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.01 && latest < 0.99) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }

    if (latest > 0.6 && latest < 0.9) {
      setShowScrollIndicator(true);
    } else {
      setShowScrollIndicator(false);
    }
  });

  const N = spacesData.length;

  const pauseProgressShare = 0.167;
  const transitionProgressShare = 1.167;

  let inputRangeForX: number[] = [0];
  let outputRangeForX: string[] = ["0%"];
  let currentProgressMark = 0;

  if (N > 0) {
    for (let i = 0; i < N; i++) {
      const cardXPosition = `${-i * 100}%`;
      if (i > 0) {
      }

      currentProgressMark += pauseProgressShare;
      inputRangeForX.push(Math.min(1.0, currentProgressMark));
      outputRangeForX.push(cardXPosition);

      if (i < N - 1) {
        currentProgressMark += transitionProgressShare;
        const nextCardXPosition = `${-(i + 1) * 100}%`;
        inputRangeForX.push(Math.min(1.0, currentProgressMark));
        outputRangeForX.push(nextCardXPosition);
      }
    }

    if (currentProgressMark < 1.0 && N > 0) {
      inputRangeForX.push(1.0);

      outputRangeForX.push(outputRangeForX[outputRangeForX.length - 1]);
    }

    const finalInputRange: number[] = [];
    const finalOutputRange: string[] = [];
    if (inputRangeForX.length > 0) {
      finalInputRange.push(inputRangeForX[0]);
      finalOutputRange.push(outputRangeForX[0]);
      for (let k = 1; k < inputRangeForX.length; k++) {
        if (inputRangeForX[k] > finalInputRange[finalInputRange.length - 1]) {
          finalInputRange.push(inputRangeForX[k]);
          finalOutputRange.push(outputRangeForX[k]);
        } else if (
          inputRangeForX[k] === finalInputRange[finalInputRange.length - 1]
        ) {
          finalOutputRange[finalOutputRange.length - 1] = outputRangeForX[k];
        }
      }
      inputRangeForX = finalInputRange;
      outputRangeForX = finalOutputRange;
    }
  } else {
    inputRangeForX = [0, 1];
    outputRangeForX = ["0%", "0%"];
  }

  const trackX = useTransform(scrollYProgress, inputRangeForX, outputRangeForX);

  const handleContactButtonClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate("/contact");
  };

  return (
    <SpacesSection
      ref={sectionRef}
      id="spaces"
      role="region"
      aria-labelledby="spaces-title"
    >
      <StickyViewport>
        <SpacesHeader role="banner">
          <SpacesTitle id="spaces-title" as="h2">
            {t("spaces.title")}
          </SpacesTitle>
          <SpacesSubtitle>{t("spaces.subtitle")}</SpacesSubtitle>
        </SpacesHeader>
        <CardsTrackContainer
          style={{ width: `${N * 100}%`, x: trackX }}
          role="tablist"
          aria-label="Espacios disponibles en Moonhaus"
        >
          {spacesData.map((space, _index) => (
            <CardPageWrapper
              key={space.id}
              role="tabpanel"
              aria-labelledby={`space-${space.id}-title`}
            >
              <SpaceCard
                role="article"
                aria-label={`Espacio ${t(space.titleKey)}`}
              >
                <ParallaxCardBackground
                  bgImage={space.bgImage}
                  scrollYProgress={scrollYProgress}
                  alt={`Imagen del espacio ${t(
                    space.titleKey
                  )} en Moonhaus Valencia`}
                />
                <CardContent>
                  <CardTitle id={`space-${space.id}-title`} as="h3">
                    {t(space.titleKey)}
                  </CardTitle>
                  <CardDetails
                    role="list"
                    aria-label={`Características del espacio ${t(
                      space.titleKey
                    )}`}
                  >
                    {space.details.map((detail, detailIndex) => (
                      <DetailItem
                        key={`${space.id}-detail-${detailIndex}`}
                        role="listitem"
                      >
                        <DetailBullet aria-hidden="true">•</DetailBullet>
                        <DetailText>
                          <h4>{t(detail.titleKey)}</h4>
                          <p>{t(detail.descriptionKey)}</p>
                        </DetailText>
                      </DetailItem>
                    ))}
                  </CardDetails>
                </CardContent>
              </SpaceCard>
            </CardPageWrapper>
          ))}
        </CardsTrackContainer>

        {/* Indicador de scroll con animación */}
        {showScrollIndicator && (
          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            aria-label="Continúa desplazándote para ver más espacios"
            role="status"
          />
        )}
      </StickyViewport>

      <FixedButtonContainer
        animate={{
          opacity: isButtonVisible ? 1 : 0,
          pointerEvents: isButtonVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, pointerEvents: "none" }}
        role="complementary"
      >
        <StyledButtonLink
          href="/contact"
          onClick={handleContactButtonClick}
          tabIndex={isButtonVisible ? 0 : -1}
          role="button"
          aria-label="Solicitar información sobre disponibilidad y precios de espacios en Moonhaus Valencia"
        >
          {t("spaces.cta")}
        </StyledButtonLink>
      </FixedButtonContainer>
    </SpacesSection>
  );
};

export default Spaces;
