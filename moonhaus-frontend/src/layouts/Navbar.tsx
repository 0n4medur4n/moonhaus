import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../components/ui/LanguageSwitch";

// Define el tipo para los estilos inline
interface CustomStyles extends CSSProperties {
  position?: any;
  textDecoration?: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil
  const { t } = useTranslation();

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar al cargar la página
    checkIfMobile();

    // Añadir event listener para redimensionamiento
    window.addEventListener("resize", checkIfMobile);

    // Limpiar el event listener
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Estilos base para los enlaces
  const linkStyle: CustomStyles = {
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: isMobile ? "18px" : "16px",
    letterSpacing: "1px",
    textDecoration: "none",
    position: "relative",
    padding: isMobile ? "15px 0" : "10px 20px",
    transition: "all 0.3s ease",
    zIndex: 2,
    mixBlendMode: "difference",
  };

  const activeStyle: CustomStyles = {
    ...linkStyle,
    fontWeight: 700,
    textShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
  };

  // Contenedor de enlace
  const linkContainerStyle: CustomStyles = {
    position: "relative",
    padding: "6px 10px",
    margin: isMobile ? "10px 0" : "0 5px",
    overflow: "hidden",
    borderRadius: "4px",
  };

  // Variantes para el texto
  const textVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Variantes para el fondo brillante
  const glowBackgroundVariants = {
    initial: {
      scale: 0.85,
      opacity: 0,
      filter: "blur(8px)",
    },
    hover: {
      scale: 1.2,
      opacity: 0.9,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  // Variantes para la línea luminosa
  const lineVariants = {
    initial: {
      scaleX: 0,
      opacity: 0,
    },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.1,
      },
    },
  };

  // Variantes para el círculo de partículas
  const particleCircleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    hover: {
      scale: 1,
      opacity: 0.8,
      transition: {
        duration: 0.6,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };

  // Variantes para el menú móvil
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Variantes para el botón hamburguesa
  const hamburgerTopVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 9 },
  };

  const hamburgerMiddleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const hamburgerBottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -9 },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: isMobile ? "calc(100% - 48px)" : "auto",
      }}
    >
      {/* Contenedor principal */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "50px",
          boxShadow:
            "0 8px 32px 0 rgba(255, 255, 255, 0.54), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          minWidth: isMobile ? "0" : "420px",
          justifyContent: isMobile ? "space-between" : "flex-start",
          padding: isMobile ? "0 10px" : "0",
        }}
      >
        {/* Logo */}
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ display: "block", height: "100%" }}>
            <img
              src="/logo/MoonHaus Logo.webp"
              alt="MoonHaus"
              style={{
                height: "100%",
                maxHeight: isMobile ? "70px" : "90px",
                marginLeft: "30px",
                width: "auto",
                filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                display: "block",
              }}
            />
          </Link>
        </div>

        {/* Espacio de separación - solo visible en desktop */}
        {!isMobile && (
          <div style={{ flex: "1 1 auto", minWidth: "60px" }}></div>
        )}

        {/* Botón hamburguesa - solo visible en móvil */}
        {isMobile && (
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "20px",
              zIndex: 60,
            }}
            onClick={toggleMenu}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={hamburgerTopVariants}
              transition={{ duration: 0.3 }}
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#FFFFFF",
                marginBottom: "6px",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={hamburgerMiddleVariants}
              transition={{ duration: 0.3 }}
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#FFFFFF",
                marginBottom: "6px",
                borderRadius: "2px",
              }}
            />
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={hamburgerBottomVariants}
              transition={{ duration: 0.3 }}
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#FFFFFF",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          </div>
        )}

        {/* Contenido del Navbar para desktop */}
        {!isMobile && (
          <>
            {/* Links de navegación */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "25px",
                  alignItems: "center",
                  padding: "0 20px",
                }}
              >
                {/* Link de Inicio */}
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  style={linkContainerStyle}
                >
                  {/* Círculo de partículas */}
                  <motion.div
                    variants={particleCircleVariants}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "120%",
                      height: "120%",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      transform: "translate(-50%, -50%)",
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Fondo luminoso */}
                  <motion.div
                    variants={glowBackgroundVariants}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      background:
                        location.pathname === "/"
                          ? "linear-gradient(135deg, rgba(53, 73, 78, 0.6) 0%, rgba(187, 137, 255, 0.6) 100%)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
                      borderRadius: "8px",
                      transform: "translate(-50%, -50%)",
                      zIndex: 0,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Texto del enlace con animación */}
                  <motion.div variants={textVariants}>
                    <Link
                      to="/"
                      style={
                        location.pathname === "/" ? activeStyle : linkStyle
                      }
                    >
                      {t("navbar.home")}
                    </Link>
                  </motion.div>

                  {/* Línea luminosa */}
                  <motion.div
                    variants={lineVariants}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      height: "2px",
                      width: "100%",
                      background:
                        "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)",
                      transformOrigin: "left",
                      zIndex: 1,
                    }}
                  />
                </motion.div>

                {/* Link de Contacto */}
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  style={linkContainerStyle}
                >
                  {/* Círculo de partículas */}
                  <motion.div
                    variants={particleCircleVariants}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "120%",
                      height: "120%",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      transform: "translate(-50%, -50%)",
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Fondo luminoso */}
                  <motion.div
                    variants={glowBackgroundVariants}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      background:
                        location.pathname === "/contact"
                          ? "linear-gradient(135deg, rgba(53, 73, 78, 0.6) 0%, rgba(187, 137, 255, 0.6) 100%)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
                      borderRadius: "8px",
                      transform: "translate(-50%, -50%)",
                      zIndex: 0,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Texto del enlace con animación */}
                  <motion.div variants={textVariants}>
                    <Link
                      to="/contact"
                      style={
                        location.pathname === "/contact"
                          ? activeStyle
                          : linkStyle
                      }
                    >
                      {t("navbar.contact")}
                    </Link>
                  </motion.div>

                  {/* Línea luminosa */}
                  <motion.div
                    variants={lineVariants}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      height: "2px",
                      width: "100%",
                      background:
                        "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)",
                      transformOrigin: "left",
                      zIndex: 1,
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Switch para cambio de idioma en desktop */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <LanguageSwitch isMobile={false} />
            </div>
          </>
        )}

        {/* Menú móvil desplegable */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "10px",
                backgroundColor: "rgba(15, 15, 20, 0.95)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                borderRadius: "20px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow:
                  "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                zIndex: 55,
              }}
            >
              {/* Links de navegación móvil */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    ...linkContainerStyle,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      ...linkStyle,
                      fontSize: "20px",
                      fontWeight: location.pathname === "/" ? 700 : 600,
                    }}
                  >
                    {t("navbar.home")}
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    ...linkContainerStyle,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Link
                    to="/contact"
                    style={{
                      ...linkStyle,
                      fontSize: "20px",
                      fontWeight: location.pathname === "/contact" ? 700 : 600,
                    }}
                  >
                    {t("navbar.contact")}
                  </Link>
                </motion.div>
              </div>

              {/* Switch de idioma en móvil */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <LanguageSwitch isMobile={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
