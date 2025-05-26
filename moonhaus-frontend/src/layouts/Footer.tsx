import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";

// Contenedor principal del footer minimalista
const FooterContainer = styled.footer`
  position: relative;
  background: linear-gradient(135deg, rgb(36, 12, 57) 0%, rgb(52, 42, 78) 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 40%,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 50%
    );
    z-index: 1;
  }
`;

// Contenido principal
const FooterContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Sección superior simplificada
const HeroSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const MainTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.3;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

const Description = styled(motion.p)`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin-bottom: 2rem;
`;

// Grid de contenido simplificado
const ContentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 400;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Newsletter simplificado
const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 0.6rem 1rem;
  color: white;
  font-size: 0.9rem;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SubscribeButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 0.6rem 1.5rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

// CTA Principal con estilo consistente
const CTASection = styled(motion.div)`
  text-align: center;
  margin: 2rem 0;
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  background: transparent;
  color: #fff;
  padding: 1rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

// Footer inferior
const BottomSection = styled(motion.div)`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;

const Tagline = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
`;
const DesignCredit = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }
`;
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email subscribed:", email);
    setEmail("");
  };

  return (
    <FooterContainer>
      <FooterContent>
        <HeroSection
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MainTitle>{t("footer.title")}</MainTitle>
          <Subtitle>{t("footer.subtitle")}</Subtitle>
          <Description>{t("footer.description")}</Description>
        </HeroSection>

        <ContentGrid
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Contacto */}
          <ContentCard>
            <CardTitle>{t("footer.contact.title")}</CardTitle>
            <ContactInfo>
              <p>{t("footer.contact.email")}</p>
              <p>{t("footer.contact.phone")}</p>
              <p>{t("footer.contact.address")}</p>
            </ContactInfo>
          </ContentCard>

          {/* Enlaces */}
          <ContentCard>
            <CardTitle>{t("footer.links.title")}</CardTitle>
            <LinkList>
              <LinkItem>
                <Link to="/">{t("footer.links.home")}</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/contact">{t("footer.links.contact")}</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/#spaces">{t("footer.links.spaces")}</Link>
              </LinkItem>
              <LinkItem>
                <Link to="/#community">{t("footer.links.community")}</Link>
              </LinkItem>
            </LinkList>
          </ContentCard>

          {/* Redes Sociales */}
          <ContentCard>
            <CardTitle>{t("footer.social.title")}</CardTitle>
            <SocialLinks>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </SocialIcon>
            </SocialLinks>
          </ContentCard>

          {/* Newsletter */}
          <ContentCard>
            <CardTitle>{t("footer.newsletter.title")}</CardTitle>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {t("footer.newsletter.description")}
            </p>
            <NewsletterForm onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <SubscribeButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("footer.newsletter.button")}
              </SubscribeButton>
            </NewsletterForm>
          </ContentCard>
        </ContentGrid>

        <CTASection
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CTAButton
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("footer.cta")}
          </CTAButton>
        </CTASection>

        <BottomSection
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Copyright>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </Copyright>
          <Tagline>{t("footer.tagline")}</Tagline>
          <DesignCredit>
            Designed with passion, crafted with ❤️ by{" "}
            <a href="https://becr3ative.com/" target="_blank" rel="noopener ">
              Be Creative
            </a>
          </DesignCredit>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
