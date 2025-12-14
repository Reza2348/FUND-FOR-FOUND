"use client";

import { useState, useRef, useEffect } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";

export default function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [iconAnimating, setIconAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    setOpen(true);
    setTimeout(() => setVisible(true), 10);
  };
  const closeDropdown = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  };
  const toggleDropdown = () => {
    if (open) closeDropdown();
    else openDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = () => {
    if (theme === "system") return <HiOutlineComputerDesktop />;
    if (resolvedTheme === "light") return <IoSunnyOutline />;
    if (resolvedTheme === "dark") return <FaRegMoon />;
    return <HiOutlineComputerDesktop />; // حالت پیشفرض
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // افکت چرخش هنگام تغییر تم
    setIconAnimating(true);
    setTimeout(() => setIconAnimating(false), 300);
    setTheme(newTheme);
    closeDropdown();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleDropdown}
        aria-label="Theme selector"
        className={`
          flex items-center justify-center
          w-9 h-9 text-lg
          sm:w-10 sm:h-10 sm:text-xl
          md:w-11 md:h-11 md:text-2xl
          rounded-xl border
          bg-white dark:bg-gray-800
          transition-all
          ${iconAnimating ? "animate-spin-slow" : ""}
        `}
      >
        {getIcon()}
      </button>

      {open && (
        <div
          className={`
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
            transform transition-all duration-200 ease-in-out
            origin-top
            ${
              visible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }
          `}
        >
          <button
            onClick={() => handleThemeChange("light")}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Dark
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
}
