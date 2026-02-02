import { createContext, useEffect, useState, type ReactNode } from "react";

import type { ThemeContextType, Theme } from "../types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage or default to system preference
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;

    return "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // 1. Save choice to localStorage
    localStorage.setItem("theme", theme);
    // 2. Apply theme class to document for global CSS styling
    const root = window.document.documentElement;
    // Apply the attribute Bootstrap looks for
    root.setAttribute("data-bs-theme", theme);

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
