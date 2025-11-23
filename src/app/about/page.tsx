"use client";

import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl text-start md:text-4xl font-bold text-black">
          {t("About Us")}
        </h1>

        <p className="text-gray-600 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base md:text-lg">
          {t("Paragraph")}
        </p>

        <p className="text-gray-600 mt-3 leading-relaxed text-sm sm:text-base md:text-lg">
          {t("Paragraph2")}
        </p>
      </div>
    </div>
  );
};

export default About;
