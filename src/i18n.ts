// src/i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en.json";
import translationFA from "./locales/fa.json";
import translationAR from "./locales/ar.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  fa: { translation: translationFA },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18n;
