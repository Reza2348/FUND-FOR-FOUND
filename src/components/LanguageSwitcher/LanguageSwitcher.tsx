"use client";

import { useState, useRef, useEffect } from "react";
import { MdOutlineTranslate } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const languages = ["en", "fa", "ar", "ru"] as const;
type Lang = (typeof languages)[number];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();

  // Mount effect: ثبت event listener و mounted state
  useEffect(() => {
    setMounted(true);

    const handler = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []); // طول آرایه dependency ثابت

  // Effect جدا برای تنظیم راست به چپ یا چپ به راست
  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "fa" || i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const changeLanguage = (lng: Lang) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const getLanguageName = (languageCode: Lang) => {
    switch (languageCode) {
      case "en":
        return t("English (100)");
      case "fa":
        return t("Persian (100)");
      case "ar":
        return t("Arabic (100)");
      case "ru":
        return t("Russian (100)");
      default:
        return t("English (100)");
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-1
          px-2 py-1 rounded-md
          text-sm md:text-base
          bg-white dark:bg-gray-800
          border border-border
          shadow-sm
          transition-colors duration-150
        "
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <MdOutlineTranslate className="text-lg md:text-xl" />
        <span className="truncate">
          {mounted ? getLanguageName(i18n.language as Lang) : <>&nbsp;</>}
        </span>
        <BsChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } text-muted-foreground`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            fixed sm:absolute
            left-1/2 sm:left-auto
            -translate-x-1/2 sm:translate-x-0
            bottom-4 sm:bottom-full
            sm:right-0
            w-[90vw] sm:w-32 md:w-36
            max-h-[50vh]
            overflow-y-auto
            rounded-xl
            bg-white dark:bg-gray-800
            shadow-lg
            z-50
          "
          role="listbox"
        >
          {languages.map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className="
                w-full px-4 py-3 text-left
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
              role="option"
              aria-selected={i18n.language === lng}
            >
              {lng === "en" && "English"}
              {lng === "ar" && "Arabic"}
              {lng === "ru" && "Russian"}
              {lng === "fa" && "Persian"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
