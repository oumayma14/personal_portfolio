import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── stars ── */
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const stars = Array.from({ length: starCount }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      cyan:  Math.random() > 0.7, // 30% cyan-tinted, rest white
    }));

    /* ── meteors ── */
    const makeMeteor = () => ({
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height * 0.5,
      len:      Math.random() * 160 + 80,
      speed:    Math.random() * 1 + 2,
      opacity:  0,
      maxOpacity: Math.random() * 0.6 + 0.3,
      progress: 0, // 0 → 1
      delay:    Math.random() * 6000,
      active:   false,
    });
    const meteors = Array.from({ length: 5 }, makeMeteor);

    /* stagger meteor launches */
    meteors.forEach((m, i) => {
      setTimeout(() => { m.active = true; }, m.delay + i * 1200);
    });

    const resetMeteor = (m) => {
      Object.assign(m, makeMeteor());
      m.active = false;
      setTimeout(() => { m.active = true; }, m.delay);
    };

    /* ── draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* stars */
      stars.forEach((s) => {
        s.phase += s.speed * 0.012;
        const alpha = 0.25 + 0.55 * ((Math.sin(s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.cyan
          ? `rgba(0,212,255,${alpha * 0.7})`
          : `rgba(200,230,255,${alpha})`;
        ctx.fill();
      });

      /* meteors */
      meteors.forEach((m) => {
        if (!m.active) return;

        m.progress += m.speed / (canvas.width * 0.9);

        /* fade in first 20%, full opacity 20-70%, fade out last 30% */
        if      (m.progress < 0.2) m.opacity = (m.progress / 0.2) * m.maxOpacity;
        else if (m.progress < 0.7) m.opacity = m.maxOpacity;
        else                       m.opacity = ((1 - m.progress) / 0.3) * m.maxOpacity;

        if (m.progress >= 1) { resetMeteor(m); return; }

        const angle = Math.PI / 4; // 45°
        const dx = Math.cos(angle) * m.len;
        const dy = Math.sin(angle) * m.len;
        const cx = m.x + Math.cos(angle) * m.speed * m.progress * canvas.width;
        const cy = m.y + Math.sin(angle) * m.speed * m.progress * canvas.width * 0.4;

        const grad = ctx.createLinearGradient(cx, cy, cx - dx, cy - dy);
        grad.addColorStop(0, `rgba(255,255,255,${m.opacity})`);
        grad.addColorStop(0.3, `rgba(0,212,255,${m.opacity * 0.6})`);
        grad.addColorStop(1, "rgba(0,212,255,0)");

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - dx, cy - dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = "rgba(0,212,255,0.6)";
        ctx.shadowBlur  = 6;
        ctx.stroke();
        ctx.shadowBlur  = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};