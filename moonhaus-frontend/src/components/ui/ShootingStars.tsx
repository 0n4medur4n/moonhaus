import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface StarProps {
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  angle: number;
  opacity: number;
}

const shooting = keyframes`
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100vw) translateY(50vh);
    opacity: 0;
  }
`;

const Star = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "left",
      "top",
      "animationDuration",
      "animationDelay",
      "size",
      "angle",
      "opacity",
    ].includes(prop),
})<StarProps>`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: transparent;
  border-radius: 50%;
  animation: ${shooting} ${(props) => props.animationDuration} linear infinite;
  animation-delay: ${(props) => props.animationDelay};
  opacity: ${(props) => props.opacity};
  transform: rotate(${(props) => props.angle}deg);
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 2px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(158, 87, 255, 0.6) 40%,
      transparent 70%
    );
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(158, 87, 255, 0.4) 30%,
      transparent 100%
    );
    border-radius: 1px;
  }
`;

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
  max-width: 100vw;
`;

const ShootingStars: React.FC<{ numberOfStars?: number }> = ({
  numberOfStars = 15,
}) => {
  const [stars, setStars] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStarsArray: React.ReactElement[] = [];
      for (let i = 0; i < numberOfStars; i++) {
        newStarsArray.push(
          <Star
            key={`star-${i}`}
            left={`${Math.random() * 100 + 10}%`}
            top={`${Math.random() * 70 + 10}%`}
            animationDuration={`${Math.random() * 3 + 4}s`}
            animationDelay={`${Math.random() * 8}s`}
            size={`${Math.random() * 1 + 0.5}px`}
            angle={Math.random() * 20 + 30}
            opacity={Math.random() * 0.5 + 0.3}
          />
        );
      }
      setStars(newStarsArray);
    };
    generateStars();
  }, [numberOfStars]);

  return <StarsContainer>{stars}</StarsContainer>;
};

export default ShootingStars;
