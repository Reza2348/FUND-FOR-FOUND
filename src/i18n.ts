"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationFA from "./locales/fa.json";
import translationAR from "./locales/ar.json";
import translationRU from "./locales/ru.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  fa: { translation: translationFA },
  ru: { translation: translationRU },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },

    detection: {
      order: ["cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
      lookupCookie: "i18next",
      cookieMinutes: 60 * 24 * 30,
    },

    react: { useSuspense: false },
  });

export default i18n;
