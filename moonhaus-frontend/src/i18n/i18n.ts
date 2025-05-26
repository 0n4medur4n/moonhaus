import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "es",
    fallbackLng: "es",

    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },

    // Configuración de debugging (solo en desarrollo)
    debug: process.env.NODE_ENV === "development",

    // Configuración de namespaces
    defaultNS: "translation",
    ns: ["translation"],

    // Configuración de detección de idioma
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    // Asegurar que los recursos se carguen correctamente
    resources: {
      es: {
        translation: {},
      },
    },
  });

export default i18n;
