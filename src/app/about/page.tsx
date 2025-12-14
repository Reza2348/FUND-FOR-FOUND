"use client";

import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-12 sm:py-16 md:py-24">
      <div className="max-w-3xl mx-auto card text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          {t("About Us")}
        </h1>

        <p className="mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base md:text-lg text-foreground">
          {t("Paragraph")}
        </p>

        <p className="mt-3 leading-relaxed text-sm sm:text-base md:text-lg text-foreground">
          {t("Paragraph2")}
        </p>
      </div>
    </div>
  );
};

export default About;
