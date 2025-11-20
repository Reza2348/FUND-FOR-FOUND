"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function RTLHandler() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return null;
}
