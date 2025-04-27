import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../index.css";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={`
        w-12 h-12 rounded-lg 
        transition-all duration-200 ease-in-out
        flex items-center justify-center
        bg-transparent
        ${
          theme === "dark"
            ? "hover:bg-gray-700 text-yellow-300 hover:text-yellow-200"
            : "hover:bg-gray-200 text-gray-700 hover:text-gray-900"
        }
        
        hover:shadow-md
      `}
    >
      {theme === "dark" ? <Sun size={64} /> : <Moon size={64} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
