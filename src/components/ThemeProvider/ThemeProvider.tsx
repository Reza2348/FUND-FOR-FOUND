"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // بارگذاری اولیه از localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setThemeState(savedTheme);
    setMounted(true);
  }, []);

  // تغییر تم
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // بررسی تم واقعی
  useEffect(() => {
    if (!mounted) return;

    let resolved: "light" | "dark" = "light";

    const applyTheme = () => {
      if (theme === "light") resolved = "light";
      else if (theme === "dark") resolved = "dark";
      else if (theme === "system") {
        // بر اساس ساعت سیستم: 7 صبح تا 6 عصر → Light، بقیه → Dark
        const hour = new Date().getHours();
        resolved = hour >= 7 && hour < 18 ? "light" : "dark";

        // یا می‌توانیم از prefers-color-scheme استفاده کنیم:
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        if (mediaQuery.matches) resolved = "dark";
        else resolved = "light";
      }

      setResolvedTheme(resolved);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolved);
    };

    applyTheme();

    // Listener برای تغییر prefers-color-scheme
    let mediaQuery: MediaQueryList;
    let listener: (e: MediaQueryListEvent) => void;
    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      listener = () => applyTheme();
      mediaQuery.addEventListener("change", listener);
    }

    // بررسی تغییر ساعت سیستم هر دقیقه
    const interval = setInterval(() => {
      if (theme === "system") applyTheme();
    }, 60000); // هر دقیقه

    return () => {
      clearInterval(interval);
      if (theme === "system")
        mediaQuery.removeEventListener("change", listener);
    };
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {mounted ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
