import { useEffect, useState, useRef } from "react";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home",     href: "#hero",     num: "01" },
  { name: "About",    href: "#about",    num: "02" },
  { name: "Skills",   href: "#skills",   num: "03" },
  { name: "Projects", href: "#projects", num: "04" },
  { name: "Contact",  href: "#contact",  num: "05" },
];

export const Navbar = () => {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState("#hero");
  const [hovered,     setHovered]     = useState(null);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [isDarkMode,  setIsDarkMode]  = useState(false);
  const [themeHover,  setThemeHover]  = useState(false);
  const indicatorRef = useRef(null);
  const linksRef     = useRef({});

  /* load saved theme */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  /* scroll spy + progress */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH    = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrollY > 10);
      setScrollPct(docH > 0 ? (scrollY / docH) * 100 : 0);
      const sections = navItems.map((i) => document.querySelector(i.href)).filter(Boolean);
      let current = "#hero";
      sections.forEach((s) => { if (scrollY >= s.offsetTop - 140) current = "#" + s.id; });
      setActiveLink(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* sliding indicator */
  useEffect(() => {
    const target = hovered || activeLink;
    const el  = linksRef.current[target];
    const ind = indicatorRef.current;
    if (!el || !ind) return;
    const rect       = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();
    ind.style.width   = rect.width + "px";
    ind.style.left    = (rect.left - parentRect.left) + "px";
    ind.style.opacity = "1";
  }, [activeLink, hovered]);

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
    <nav className={cn("cyber-nav", isScrolled && "scrolled")}>

      {/* progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 2, background: "rgba(255,255,255,.04)" }}>
        <div style={{
          height: "100%", width: scrollPct + "%",
          background: "linear-gradient(90deg, var(--cyber-primary), var(--cyber-accent))",
          boxShadow: "0 0 8px rgba(0,212,255,.6)",
          transition: "width .1s linear",
        }} />
      </div>

      <div className="container flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={() => setActiveLink("#hero")}>
          <span className="nav-logo-icon"><Terminal size={14} /></span>
          <span className="nav-logo-text">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Oumayma</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <span className="nav-logo-cursor" />
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-1">
          <div
            className="flex items-center gap-1"
            style={{ position: "relative" }}
            onMouseLeave={() => setHovered(null)}
          >
            <span ref={indicatorRef} className="nav-indicator" />
            {navItems.map((item) => (
              <a
                key={item.href}
                ref={(el) => (linksRef.current[item.href] = el)}
                href={item.href}
                className={cn("nav-link", activeLink === item.href && "active")}
                onMouseEnter={() => setHovered(item.href)}
                onClick={() => { setActiveLink(item.href); setHovered(null); }}
              >
                <span className="nav-link-num">{item.num}</span>
                <span className="nav-link-name">{item.name}</span>
              </a>
            ))}
          </div>

          {/* theme toggle — inline with nav links */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setThemeHover(true)}
            onMouseLeave={() => setThemeHover(false)}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="theme-toggle-btn"
            style={{
              marginLeft: ".5rem",
              borderColor: themeHover ? "var(--cyber-primary)" : "var(--cyber-border)",
              background:  themeHover ? "rgba(0,212,255,.08)" : "transparent",
              boxShadow:   themeHover ? "var(--cyber-glow)" : "none",
            }}
          >
            <span className="theme-toggle-icon" style={{ transform: themeHover ? "rotate(20deg) scale(1.15)" : "none" }}>
              {isDarkMode
                ? <Sun  size={15} style={{ color: themeHover ? "#fff" : "var(--cyber-primary)" }} />
                : <Moon size={15} style={{ color: themeHover ? "#fff" : "var(--cyber-primary)" }} />
              }
            </span>
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
            style={{ borderColor: "var(--cyber-border)", background: "transparent" }}
          >
            <span className="theme-toggle-icon">
              {isDarkMode ? <Sun size={15} style={{ color: "var(--cyber-primary)" }} /> : <Moon size={15} style={{ color: "var(--cyber-primary)" }} />}
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className={cn("nav-toggle", isMenuOpen && "open")}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <span className="toggle-bar" />
            <span className="toggle-bar" />
            <span className="toggle-bar" />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden",
          "transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(5,10,20,.97)", backdropFilter: "blur(16px)" }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,212,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.03) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="flex flex-col items-center gap-2" style={{ position: "relative", zIndex: 1 }}>
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={cn("mobile-nav-link-full", activeLink === item.href && "active")}
              style={{ animationDelay: isMenuOpen ? `${i * 80}ms` : "0ms" }}
              onClick={() => { setIsMenuOpen(false); setActiveLink(item.href); }}
            >
              <span className="mobile-full-num">{item.num}</span>
              <span className="mobile-full-name">{item.name}</span>
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "absolute", top: "1.5rem", right: "1.5rem",
            background: "transparent", border: "1px solid var(--cyber-border)",
            color: "var(--cyber-primary)", width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all .2s",
          }}
        >
          <X size={18} />
        </button>
      </div>
    </nav>
  );
};