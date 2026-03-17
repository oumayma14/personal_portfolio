import { useEffect, useRef } from "react";
import { ArrowLeft, Terminal } from "lucide-react";

const useParticles = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.2,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.phase += p.speed * 0.012;
        const a = 0.2 + 0.4 * ((Math.sin(p.phase) + 1) / 2);
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

export const NotFound = () => {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cyber-bg, #050a14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-body, 'Rajdhani', sans-serif)",
      }}
    >
      {/* canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,212,255,.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>

        {/* terminal header */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: ".5rem",
          fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
          fontSize: ".75rem", letterSpacing: ".2em",
          color: "var(--cyber-primary, #00d4ff)",
          marginBottom: "2rem",
        }}>
          <Terminal size={14} />
          ERROR_LOG.SH
        </div>

        {/* 404 */}
        <h1 style={{
          fontFamily: "var(--font-head, 'Orbitron', monospace)",
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "var(--cyber-primary, #00d4ff)",
          textShadow: "0 0 40px rgba(0,212,255,.4), 0 0 80px rgba(0,212,255,.2)",
          margin: 0,
          letterSpacing: ".05em",
        }}>
          404
        </h1>

        {/* glitch bar */}
        <div style={{
          width: 120, height: 2, margin: "1.5rem auto",
          background: "linear-gradient(90deg, transparent, var(--cyber-primary, #00d4ff), transparent)",
        }} />

        {/* message */}
        <p style={{
          fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
          fontSize: ".85rem",
          color: "var(--cyber-text-muted, #5a8aa8)",
          letterSpacing: ".1em",
          marginBottom: ".5rem",
        }}>
          SIGNAL_LOST — PAGE NOT FOUND
        </p>
        <p style={{
          fontSize: "1rem",
          color: "var(--cyber-text-muted, #5a8aa8)",
          maxWidth: 360,
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
        }}>
          The page you're looking for has been moved, deleted, or never existed.
        </p>

        {/* back button */}
        <a
          href="/"
          className="cyber-btn"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: ".5rem", position: "relative", zIndex: 1 }}>
            <ArrowLeft size={14} /> Return Home
          </span>
        </a>

        {/* terminal block */}
        <div style={{
          marginTop: "3rem",
          background: "#020810",
          border: "1px solid var(--cyber-border, #1a3a5c)",
          padding: "1rem 1.5rem",
          fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
          fontSize: ".75rem",
          color: "var(--cyber-text-muted, #5a8aa8)",
          textAlign: "left",
          maxWidth: 400,
          margin: "3rem auto 0",
        }}>
          <div><span style={{ color: "var(--cyber-primary, #00d4ff)" }}>$ </span>ping {window.location.pathname}</div>
          <div style={{ color: "#ff2d78", marginTop: ".3rem" }}>Request timeout — host unreachable</div>
          <div style={{ marginTop: ".3rem" }}><span style={{ color: "var(--cyber-primary, #00d4ff)" }}>$ </span>cd ~/<span style={{ color: "#00d4ff" }}>home</span></div>
          <div style={{ color: "#28c840", marginTop: ".3rem" }}>Redirecting...</div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;