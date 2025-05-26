import React, { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform, motion } from "framer-motion";
import ErrorBoundary from "../utils/ErrorBoundary";

declare module "@react-three/fiber" {
  interface ThreeElements {
    group: any;
    mesh: any;
    sphereGeometry: any;
    color: any;
    ambientLight: any;
    spotLight: any;
    meshBasicMaterial: any;
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/backgrounds/backgroundHero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Preload critical image */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/backgrounds/backgroundHero.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
    opacity: 0;
  }
`;

// Contenedor para el canvas de Three.js con efecto parallax
const EnergySphereContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  pointer-events: none;
  overflow: visible;
  max-width: 100%;
`;

// Contenido del hero perfectamente centrado y responsive
const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  padding: 0 2rem;
  animation: ${fadeIn} 1.5s ease-out forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Ajustes para dispositivos pequeños */
  @media (max-height: 700px) {
    padding: 0 1.5rem;
  }

  @media (max-height: 600px) {
    padding: 0 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 300;
  letter-spacing: clamp(0.5rem, 1.5vw, 1.5rem);
  margin-bottom: clamp(0.5rem, 1vh, 1rem);
  background: linear-gradient(135deg, #ffffff, #f2e6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    letter-spacing: clamp(0.3rem, 1vw, 0.8rem);
  }

  @media (max-height: 600px) {
    font-size: clamp(1.5rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  font-weight: 300;
  letter-spacing: clamp(0.2rem, 0.5vw, 0.5rem);
  margin-bottom: clamp(3rem, 7vh, 7rem);
  color: rgba(228, 208, 255, 0.82);
  text-transform: uppercase;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    letter-spacing: clamp(0.1rem, 0.3vw, 0.3rem);
  }

  @media (max-height: 700px) {
    margin-bottom: clamp(2rem, 5vh, 5rem);
  }

  @media (max-height: 600px) {
    margin-bottom: clamp(1.5rem, 3vh, 3rem);
    font-size: clamp(0.7rem, 1vw, 1rem);
  }
`;

const HeroDescription = styled.p`
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: clamp(2rem, 3vh, 3rem);
  color: rgba(255, 255, 255, 0.82);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 100%;

  @media (max-height: 700px) {
    line-height: 1.6;
    margin-bottom: clamp(1.5rem, 2vh, 2rem);
  }

  @media (max-height: 600px) {
    font-size: clamp(0.8rem, 1vw, 0.9rem);
    line-height: 1.4;
    margin-bottom: clamp(1rem, 1.5vh, 1.5rem);
  }
`;

// Navegación de características centrada y responsive
const FeaturesNav = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 3vw, 3rem);
  margin-bottom: clamp(2rem, 3vh, 3rem);
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: clamp(0.5rem, 1vw, 1rem);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-height: 600px) {
    margin-bottom: clamp(1rem, 1.5vh, 1.5rem);
  }
`;

const FeatureItem = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  padding: clamp(0.3rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 1rem);
  border: 1px solid transparent;
  margin-top: 2rem;
  border-radius: 50px;
  text-align: center;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  span {
    font-size: clamp(0.8rem, 1vw, 1rem);
    color: #fff;
    letter-spacing: clamp(0.1rem, 0.2vw, 0.2rem);
    text-transform: uppercase;
  }

  @media (max-height: 600px) {
    padding: 0.2rem 0.5rem;

    span {
      font-size: clamp(0.7rem, 0.9vw, 0.9rem);
      letter-spacing: 0.1rem;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: #fff;
  padding: clamp(0.7rem, 1vw, 1rem) clamp(2rem, 3vw, 3rem);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  margin-top: 3rem;
  font-size: clamp(0.8rem, 1vw, 1rem);
  letter-spacing: clamp(0.1rem, 0.2vw, 0.2rem);
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
  }

  @media (max-height: 600px) {
    padding: 0.5rem 1.5rem;
    font-size: 0.8rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 15px;
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
    animation: scrollAnim 2s infinite;
  }

  @keyframes scrollAnim {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }
`;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Interfaces para los componentes
interface EnergyParticlesProps {
  count: number;
  sphereSize: number;
}

interface EnergyParticleProps {
  initialPosition: number[];
  speed: number;
  color: string;
}

// Componente para crear la esfera energética
function EnergySphere() {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const { width, height } = useWindowSize();

  const sphereSize = useMemo(() => {
    if (width < 480 || height < 600) return 3.5;
    if (width < 768 || height < 700) return 4;
    return 5;
  }, [width, height]);

  const sphereMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d1c2ed"),
      transparent: true,
      opacity: 0.4,
      wireframe: true,
      emissive: new THREE.Color("#0a3d62"),
      emissiveIntensity: 0.8,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.rotation.z = t * 0.025;
    }

    const scale = 1 + Math.sin(t * 0.3) * 0.03;
    if (sphere.current) {
      sphere.current.scale.set(scale, scale, scale);
    }
  });

  const particleCount = useMemo(() => {
    if (width < 480 || height < 600) return 6;
    if (width < 768 || height < 700) return 8;
    return 10;
  }, [width, height]);

  return (
    <group ref={group}>
      <mesh ref={sphere}>
        <sphereGeometry args={[sphereSize, 64, 64]} />
        {sphereMaterial && (
          <primitive object={sphereMaterial} attach="material" />
        )}
      </mesh>

      <EnergyParticles count={particleCount} sphereSize={sphereSize * 0.8} />
    </group>
  );
}

function EnergyParticles({ count, sphereSize = 4 }: EnergyParticlesProps) {
  const particleColors = [
    "#f2e6ee",
    "#977dff",
    "#ffccf2",
    "#977dff",
    "#96b4e0",
    "#96b4e0",
    "#f68def",
    "#8d8df6",
    "#977dff",
    "#f2e6ee",
  ];

  const initialPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Posiciones dentro de la esfera
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = sphereSize * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push({ x, y, z, speed: 0.2 + Math.random() * 0.3 });
    }
    return positions;
  }, [count, sphereSize]);

  return (
    <>
      {initialPositions.map((pos, i) => (
        <EnergyParticle
          key={i}
          initialPosition={[pos.x, pos.y, pos.z]}
          speed={pos.speed}
          color={particleColors[i % particleColors.length]}
        />
      ))}
    </>
  );
}

// Componente para una partícula de energía individual - SIMPLIFICADO
const EnergyParticle: React.FC<EnergyParticleProps> = ({
  initialPosition,
  speed,
  color,
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const { width, height } = useWindowSize();

  // Ajustar el tamaño de la partícula según el tamaño de la pantalla
  const particleSize = useMemo(() => {
    if (width < 480 || height < 600) return 0.04;
    if (width < 768 || height < 700) return 0.05;
    return 0.06;
  }, [width, height]);

  // Ajustar el ancho y longitud de la estela según el tamaño de la pantalla
  const trailWidth = useMemo(() => {
    if (width < 480 || height < 600) return 0.5;
    if (width < 768 || height < 700) return 0.6;
    return 0.8;
  }, [width, height]);

  const trailLength = useMemo(() => {
    if (width < 480 || height < 600) return 10;
    if (width < 768 || height < 700) return 12;
    return 15;
  }, [width, height]);

  // Crear un camino para la partícula
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Movimiento complejo dentro de la esfera
    const x =
      initialPosition[0] * Math.cos(t * speed) -
      initialPosition[2] * Math.sin(t * speed);
    const z =
      initialPosition[0] * Math.sin(t * speed) +
      initialPosition[2] * Math.cos(t * speed);
    const y = initialPosition[1] * Math.cos(t * speed * 0.7);

    if (particleRef.current) {
      particleRef.current.position.set(x, y, z);
    }
  });

  return (
    <Trail
      width={trailWidth}
      length={trailLength}
      color={color}
      attenuation={(t: number) => t * t}
    >
      <mesh ref={particleRef} position={initialPosition}>
        <sphereGeometry args={[particleSize, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

function HeroSection() {
  const { t } = useTranslation();
  const { width, height } = useWindowSize();
  const { scrollY } = useScroll();

  const sphereOpacity = useTransform(scrollY, [0, 700], [1, 0]);

  const cameraPosition = useMemo((): [number, number, number] => {
    if (width < 480 || height < 600) return [0, 0, 12];
    if (width < 768 || height < 700) return [0, 0, 13];
    return [0, 0, 15];
  }, [width, height]);

  const cameraFOV = useMemo(() => {
    if (width < 480 || height < 600) return 45;
    if (width < 768 || height < 700) return 42;
    return 40;
  }, [width, height]);

  return (
    <HeroContainer
      id="home"
      role="banner"
      aria-label="Moonhaus Valencia - Coworking Inclusivo"
    >
      <EnergySphereContainer
        style={{
          opacity: sphereOpacity,
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      >
        <ErrorBoundary>
          <Canvas
            style={{ width: "100vw", height: "100vh" }}
            gl={{ antialias: true, alpha: true }}
            camera={{
              position: [
                cameraPosition[0],
                cameraPosition[1],
                cameraPosition[2],
              ],
              fov: cameraFOV,
            }}
            aria-hidden="true"
          >
            <color attach="background" args={["#000"]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.3}
              color="#8a2be2"
            />
            <Suspense fallback={null}>
              <EnergySphere />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.5}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </ErrorBoundary>
      </EnergySphereContainer>

      <HeroContent role="main">
        <HeroTitle as="h1">{t("hero.title")}</HeroTitle>
        <HeroSubtitle as="h2">{t("hero.subtitle")}</HeroSubtitle>
        <HeroDescription>{t("hero.description")}</HeroDescription>

        <FeaturesNav role="navigation" aria-label="Características principales">
          <FeatureItem role="button" tabIndex={0} aria-label="Coworking">
            <span>{t("hero.features.tier1.title")}</span>
          </FeatureItem>
          <FeatureItem role="button" tabIndex={0} aria-label="Arte">
            <span>{t("hero.features.stock.title")}</span>
          </FeatureItem>
          <FeatureItem role="button" tabIndex={0} aria-label="Inclusión">
            <span>{t("hero.features.shipping.title")}</span>
          </FeatureItem>
        </FeaturesNav>

        <CTAButton
          to="/contact"
          role="button"
          aria-label="Contactar con Moonhaus Valencia para reservar espacio"
        >
          {t("hero.cta")}
        </CTAButton>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-label="Desplázate hacia abajo para ver más contenido"
        role="button"
        tabIndex={0}
      />
    </HeroContainer>
  );
}

export default HeroSection;
