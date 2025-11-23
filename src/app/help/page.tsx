"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HelpPage = () => {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) return null;

  return (
    <div className="min-h-screen  flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl p-6 sm:p-10 rounded-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-6 border-b-2 border-indigo-100 pb-2 text-center">
          {t("📞 Help and Support")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">{t("Paragraph3")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              {t("Frequently Asked Questions (FAQ)")}
            </h3>
            <p className="text-indigo-600">
              {t("Quick answers to the most common questions")}
            </p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold">
              {t("View FAQ")}
            </button>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">
              {t("Submit a support ticket")}
            </h3>
            <p className="text-yellow-700">
              {t("For specialized follow-up, register your request.")}
            </p>
            <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300 font-semibold">
              {t("Submit a new ticket")}
            </button>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              {t("Video tutorials")}
            </h3>
            <p className="text-green-600">
              {t("Step-by-step guide for better use")}
            </p>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 font-semibold">
              {t("Watch the tutorials")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
