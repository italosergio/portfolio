import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "front" | "back";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("back");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "back" ? "front" : "back";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "front" ? "theme-front" : "theme-back"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
