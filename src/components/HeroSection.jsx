import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const roles = [
  "Full Stack Developer",
  "Engineering Student",
  "Data Science Enthusiast",
];

const useParticles = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      vx:    (Math.random() - .5) * .35,
      vy:    (Math.random() - .5) * .35,
      phase: Math.random() * Math.PI * 2,
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.phase += .018;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const a = (.3 + .4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${a})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
};

export const HeroSection = () => {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [visible,   setVisible]   = useState(false);
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  // typewriter
  useEffect(() => {
    const target = roles[roleIdx];
    let t;
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else { setDeleting(false); setRoleIdx((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  // staggered entrance
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="container max-w-4xl mx-auto text-center" style={{ zIndex: 1, position: "relative" }}>

        {/* boot label */}
        <p className={cn("hero-label hero-enter", visible && "entered")} style={{ transitionDelay: "0ms" }}>
          Initializing Portfolio…
        </p>

        {/* name */}
        <h1
          className={cn("hero-name hero-enter", visible && "entered")}
          style={{ transitionDelay: "160ms" }}
        >
          <span className="opacity-0 animate-fade-in">Hello, I&apos;m</span>
          <br />
          <span
            className="glitch animate-fade-in-delay-1"
            data-text="Oumayma Fazzeni"
            style={{ color: "var(--cyber-primary)", textShadow: "var(--cyber-glow)", opacity: 0 }}
          >
            Oumayma Fazzeni
          </span>
        </h1>

        {/* typewriter role */}
        <p
          className={cn("hero-sub mx-auto hero-enter", visible && "entered")}
          style={{ transitionDelay: "320ms" }}
        >
          <span className="type-cursor">{displayed || "\u00a0"}</span>
        </p>

        {/* description */}
        <p
          className={cn(
            "text-lg md:text-xl mx-auto mb-8 hero-enter",
            visible && "entered"
          )}
          style={{
            transitionDelay: "440ms",
            color: "var(--cyber-text-muted)",
            maxWidth: 560,
          }}
        >
          First-year engineering student, full-stack developer, and data science enthusiast.
        </p>

        {/* CTA buttons */}
        <div
          className={cn("flex gap-4 justify-center flex-wrap hero-enter", visible && "entered")}
          style={{ transitionDelay: "560ms" }}
        >
          <a href="#projects" className="cyber-btn"><span>View My Work</span></a>
          <a href="#contact"  className="cyber-btn accent"><span>Get In Touch</span></a>
        </div>

        {/* stat pills */}
        <div
          className={cn("hero-stats hero-enter", visible && "entered")}
          style={{ transitionDelay: "700ms" }}
        >
          {[
            { val: "1+",  label: "Years Coding"  },
            { val: "5+",  label: "Projects Built" },
            { val: "10+", label: "Technologies"   },
          ].map((s) => (
            <div key={s.label} className="stat-pill">
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-down">
        <span>Scroll</span>
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
};

// tiny cn helper inline so no extra import needed if lib/utils is missing
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}