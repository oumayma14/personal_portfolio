import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("fixed top-5 right-5 z-50 max-sm:hidden focus:outline-none")}
      style={{
        width:  40,
        height: 40,
        border: `1px solid ${hovered ? "var(--cyber-primary)" : "var(--cyber-border)"}`,
        background: hovered ? "rgba(0,212,255,.08)" : "rgba(5,10,20,.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color .25s, background .25s, box-shadow .25s",
        boxShadow: hovered ? "var(--cyber-glow)" : "none",
        /* clip-path matches the cyber-btn parallelogram */
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
      }}
    >
      {/* rotating icon wrapper */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .4s cubic-bezier(.4,0,.2,1), opacity .3s",
          transform: hovered ? "rotate(20deg) scale(1.15)" : "rotate(0deg) scale(1)",
        }}
      >
        {isDarkMode ? (
          <Sun
            className="h-5 w-5"
            style={{
              color: hovered ? "#fff" : "var(--cyber-primary)",
              filter: hovered ? `drop-shadow(0 0 6px var(--cyber-primary))` : "none",
              transition: "color .25s, filter .25s",
            }}
          />
        ) : (
          <Moon
            className="h-5 w-5"
            style={{
              color: hovered ? "#fff" : "var(--cyber-primary)",
              filter: hovered ? `drop-shadow(0 0 6px var(--cyber-primary))` : "none",
              transition: "color .25s, filter .25s",
            }}
          />
        )}
      </span>
    </button>
  );
};