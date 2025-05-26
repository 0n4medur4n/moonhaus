import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LanguageSwitchProps {
  isMobile?: boolean;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  isMobile = false,
}) => {
  const { i18n } = useTranslation();

  // Estado inicial sincronizado con i18n
  const [language, setLanguage] = useState<"es" | "en">(() => {
    const currentLang = i18n.language;
    return currentLang === "en" ? "en" : "es";
  });

  // Sincronizar estado con cambios externos de idioma
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng === "en" ? "en" : "es");
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Función optimizada para cambiar idioma de manera fluida
  const toggleLanguage = useCallback(async () => {
    const newLanguage = language === "es" ? "en" : "es";

    // Actualizar UI inmediatamente para respuesta visual instantánea
    setLanguage(newLanguage);

    // Cambiar idioma en segundo plano
    try {
      await i18n.changeLanguage(newLanguage);
    } catch (error) {
      console.error("Error changing language:", error);
      // Revertir si hay error
      setLanguage(language);
    }
  }, [language, i18n]);

  // Estilos memoizados para evitar re-cálculos
  const containerStyles = useMemo(
    () => ({
      position: "relative" as const,
      width: "80px",
      height: "38px",
      backgroundColor: isMobile
        ? "rgba(30, 30, 40, 0.5)"
        : "rgba(30, 30, 40, 0.3)",
      borderRadius: "25px",
      display: "flex",
      alignItems: "center",
      padding: "0 5px",
      cursor: "pointer",
      boxShadow:
        "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginLeft: isMobile ? "0" : "20px",
    }),
    [isMobile]
  );

  const sliderStyles = useMemo(
    () => ({
      position: "absolute" as const,
      width: "36px",
      height: "28px",
      borderRadius: "20px",
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      boxShadow:
        "0 2px 8px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15)",
      zIndex: 1,
    }),
    []
  );

  // Variantes de animación optimizadas para máxima fluidez
  const sliderVariants = useMemo(
    () => ({
      es: { x: 0 },
      en: { x: 40 },
    }),
    []
  );

  const flagVariants = useMemo(
    () => ({
      active: {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
      },
      inactive: {
        opacity: 0.5,
        scale: 0.8,
        filter: "none",
      },
    }),
    []
  );

  const flagStyles = useMemo(
    () => ({
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      position: "relative" as const,
      zIndex: 2,
      overflow: "hidden" as const,
    }),
    []
  );

  return (
    <div style={containerStyles} onClick={toggleLanguage}>
      {/* Slider animado */}
      <motion.div
        variants={sliderVariants}
        animate={language}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.7,
        }}
        style={sliderStyles}
      />

      {/* Bandera de España */}
      <motion.div
        variants={flagVariants}
        animate={language === "es" ? "active" : "inactive"}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
        style={{
          ...flagStyles,
          border:
            language === "es"
              ? "1px solid rgba(255, 255, 255, 0.8)"
              : "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <img
          src="/icons/spain-flag.svg"
          alt="Español"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          loading="lazy"
        />
      </motion.div>

      {/* Bandera de Reino Unido */}
      <motion.div
        variants={flagVariants}
        animate={language === "en" ? "active" : "inactive"}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
        style={{
          ...flagStyles,
          marginLeft: "20px",
          border:
            language === "en"
              ? "1px solid rgba(255, 255, 255, 0.8)"
              : "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <img
          src="/icons/uk-flag.svg"
          alt="English"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default React.memo(LanguageSwitch);
