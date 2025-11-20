"use client";

import { useState, useRef, useEffect } from "react";
import { MdOutlineTranslate } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    setMounted(true);

    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const changeLanguage = (lng: "en" | "fa" | "ar" | "ru") => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "fa" || lng === "ar" ? "rtl" : "ltr";
    setOpen(false);
  };

  const getLanguageName = (languageCode: string) => {
    switch (languageCode) {
      case "en":
        return t("English (100)");
      case "fa":
        return t("Persian (100)");
      case "ar":
        return t("Arabic (100)");
      case "ru":
        return t("Ruse (100)");
      default:
        return t("English (100)");
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm md:text-base text-[#123D6F] border border-black rounded-md px-2 py-1 flex items-center space-x-1 rtl:space-x-reverse transition-colors duration-150 hover:bg-gray-50 shadow-sm"
      >
        <MdOutlineTranslate className="text-lg md:text-xl" />
        <span className="truncate">
          {mounted ? getLanguageName(i18n.language) : <>&nbsp;</>}
        </span>
        <BsChevronDown
          className={`ml-1 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } text-gray-500`}
        />
      </button>

      {open && (
        <div className="absolute mb-2 bottom-full w-24 md:w-32 bg-white shadow-xl border border-gray-200 rounded-lg z-[60] text-sm overflow-hidden left-0 rtl:right-0 rtl:left-auto">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-100 text-gray-800"
            onClick={() => changeLanguage("en")}
          >
            English
          </button>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-100 text-gray-800"
            onClick={() => changeLanguage("ar")}
          >
            Arabic
          </button>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-100 text-gray-800"
            onClick={() => changeLanguage("ru")}
          >
            Ruse
          </button>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-100 text-gray-800"
            onClick={() => changeLanguage("fa")}
          >
            Persian
          </button>
        </div>
      )}
    </div>
  );
}
