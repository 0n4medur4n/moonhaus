// src/pages/Contact.tsx (o la ruta donde esté tu componente)
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import SEOHead from "../components/seo/SEOHead";
import ShootingStars from "../components/ui/ShootingStars"; // Ajusta esta ruta si es necesario
import WhatsAppChat from "../components/ui/WhatsAppChat";

// Estilo global para prevenir scroll horizontal
const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden;
    max-width: 100vw;
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

// Contenedor principal con fondo y efectos
const ContactSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 1rem;
  background: linear-gradient(
    145deg,
    rgb(20, 8, 40) 0%,
    rgb(40, 18, 70) 30%,
    rgb(30, 12, 55) 70%,
    rgb(25, 10, 45) 100%
  );
  overflow-x: hidden;
  overflow-y: auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 20% 30%,
        rgba(158, 87, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(97, 57, 182, 0.08) 0%,
        transparent 50%
      );
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 4rem 0.5rem;
  }
`;

// Contenedor del formulario con glassmorphism
const FormContainer = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    max-width: 95%;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    border-radius: 16px;
    max-width: 98%;
  }
`;

// Título principal
const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #e0d0ff 50%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(158, 87, 255, 0.7),
      transparent
    );
    margin: 1.5rem auto 0;
    border-radius: 2px;
  }
`;

// Descripción
const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  line-height: 1.6;
  margin-bottom: 3rem;
  font-weight: 300;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

// Formulario
const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Grupo de campos
const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Contenedor de campo individual
const FieldContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Etiquetas
const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  letter-spacing: 0.5px;
`;

// Inputs base
const InputBase = styled.input`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: rgba(158, 87, 255, 0.6);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 20px rgba(158, 87, 255, 0.2);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
`;

// Textarea
const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: rgba(158, 87, 255, 0.6);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 20px rgba(158, 87, 255, 0.2);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

// Botón de envío
const SubmitButton = styled(motion.button)`
  background: linear-gradient(
    135deg,
    rgba(158, 87, 255, 0.9) 0%,
    rgba(97, 57, 182, 0.9) 50%,
    rgba(138, 43, 226, 0.9) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 1rem 2rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: linear-gradient(
      135deg,
      rgba(158, 87, 255, 1) 0%,
      rgba(97, 57, 182, 1) 50%,
      rgba(138, 43, 226, 1) 100%
    );
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 10px 30px rgba(158, 87, 255, 0.4);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

// Mensajes de estado
const StatusMessage = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["type"].includes(prop),
})<{ type: "success" | "error" }>`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 400;
  margin-top: 1rem;
  background: ${(props) =>
    props.type === "success"
      ? "rgba(34, 197, 94, 0.1)"
      : "rgba(239, 68, 68, 0.1)"};
  border: 1px solid
    ${(props) =>
      props.type === "success"
        ? "rgba(34, 197, 94, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
  color: ${(props) =>
    props.type === "success"
      ? "rgba(34, 197, 94, 0.9)"
      : "rgba(239, 68, 68, 0.9)"};
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Llamada real al backend
      // const response = await fetch("http://localhost:3001/api/contact", {
      // Llamada a la API de Vercel
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si hay errores de validación, mostrar el primer error
        if (data.details && data.details.length > 0) {
          setError(data.details[0].message);
        } else {
          setError(data.error || "Error al enviar el formulario");
        }
        return;
      }

      // Éxito
      setSuccess(data.message || t("contact.form.successMessage"));
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (networkError) {
      console.error("Error de red:", networkError);
      setError(
        "Error de conexión. Por favor verifica tu conexión a internet e intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <GlobalStyle />
      <SEOHead
        title={t("contact.seo.title")}
        description={t("contact.seo.description")}
      />
      <ContactSection>
        <ShootingStars numberOfStars={12} />

        <FormContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>{t("contact.title")}</Title>

          <Description variants={itemVariants}>
            {t("contact.intro")}
          </Description>

          <Form onSubmit={handleSubmit} variants={itemVariants}>
            <FieldContainer variants={itemVariants}>
              <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
              <InputBase
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.form.namePlaceholder")}
                required
              />
            </FieldContainer>

            <FieldGroup>
              <FieldContainer variants={itemVariants}>
                <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
                <InputBase
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.emailPlaceholder")}
                  required
                />
              </FieldContainer>

              <FieldContainer variants={itemVariants}>
                <Label htmlFor="phone">{t("contact.form.phoneLabel")}</Label>
                <InputBase
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("contact.form.phonePlaceholder")}
                  required
                />
              </FieldContainer>
            </FieldGroup>

            <FieldContainer variants={itemVariants}>
              <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
              <TextArea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.form.messagePlaceholder")}
                required
              />
            </FieldContainer>

            {error && (
              <StatusMessage
                type="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </StatusMessage>
            )}

            {success && (
              <StatusMessage
                type="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {success}
              </StatusMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting
                ? t("contact.form.submittingButton")
                : t("contact.form.submitButton")}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContactSection>
      <WhatsAppChat />
    </>
  );
};

export default Contact;
