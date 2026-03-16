import { Code, Cpu, Database, GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* animated terminal that types line by line on reveal */
const termLines = [
  { prompt: true,  text: "whoami"                                                    },
  { prompt: false, text: "oumayma_fazzeni",                  color: "var(--cyber-accent2)" },
  { prompt: true,  text: "cat profile.json"                                          },
  { prompt: false, text: "{",                                color: "var(--cyber-primary)" },
  { prompt: false, text: '  "role"    : "Engineering Student"',    color: "var(--cyber-text)" },
  { prompt: false, text: '  "stack"   : ["React","Node","MongoDB","Python"]', color: "var(--cyber-text)" },
  { prompt: false, text: '  "passion" : "Data Science & Full Stack"', color: "var(--cyber-text)" },
  { prompt: false, text: '  "status"  : "Open to opportunities ✓"', color: "var(--cyber-accent2)" },
  { prompt: false, text: "}",                                color: "var(--cyber-primary)" },
];

const Terminal = ({ visible }) => {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible || shown >= termLines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 130);
    return () => clearTimeout(t);
  }, [visible, shown]);

  return (
    <div className="terminal-block mb-6">
      <div className="terminal-header">
        <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
        <span className="terminal-title">profile.sh</span>
      </div>
      <div className="terminal-body">
        {termLines.slice(0, shown).map((l, i) => (
          <div
            key={i}
            className="term-line"
            style={{ color: l.color || "var(--cyber-text)", animationDelay: `${i * 40}ms` }}
          >
            {l.prompt && <span className="prompt">$ </span>}
            {l.text}
          </div>
        ))}
        {shown < termLines.length && <span className="type-cursor">&nbsp;</span>}
      </div>
    </div>
  );
};

const capabilities = [
  {
    icon: <Code size={20} />,
    title: "Web Development",
    desc: "Building responsive SPAs & REST APIs with React, Node.js, Express and Bootstrap.",
  },
  {
    icon: <Database size={20} />,
    title: "Database Design",
    desc: "Modelling and querying data with MongoDB & MySQL through clean REST interfaces.",
  },
  {
    icon: <Cpu size={20} />,
    title: "Data Science",
    desc: "Exploring ML concepts with Python, NumPy & Pandas to surface actionable insights.",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Continuous Learning",
    desc: "First-year engineering student always adopting new frameworks and best practices.",
  },
];

export const AboutMe = () => {
  const [sectionRef, visible] = useReveal(0.08);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 relative"
      style={{ background: "var(--cyber-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">

        {/* heading */}
        <h2
          className={`section-title text-center reveal-title ${visible ? "revealed" : ""}`}
        >
          About <span className="hi">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* ── Left col ── */}
          <div className={`slide-in-left ${visible ? "revealed" : ""}`}>
            <Terminal visible={visible} />

            <p className="text-muted-foreground mb-4" style={{ lineHeight: 1.8 }}>
              With hands-on experience in full-stack development, I specialize in building
              responsive, accessible web applications using React.js, Node.js, Express, and
              MongoDB. I love turning ideas into clean, scalable digital solutions.
            </p>
            <p className="text-muted-foreground mb-8" style={{ lineHeight: 1.8 }}>
              What drives me is the continuous learning this field demands — every project
              challenges me to refine my skills and stay updated with new frameworks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="cyber-btn"><span>Get In Touch</span></a>
              <a href="#contact" className="cyber-btn accent"><span>Download CV</span></a>
            </div>
          </div>

          {/* ── Right col — capability cards ── */}
          <div className="grid grid-cols-1 gap-4">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`about-card d-flex gap-3 stagger-card ${visible ? "revealed" : ""}`}
                style={{
                  transitionDelay: `${i * 110 + 150}ms`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div className="icon-box" style={{ flexShrink: 0 }}>{c.icon}</div>
                <div className="text-left">
                  <h4
                    className="font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: ".88rem",
                      letterSpacing: ".06em",
                      color: "#fff",
                    }}
                  >
                    {c.title}
                  </h4>
                  <p className="text-muted-foreground" style={{ fontSize: ".88rem", lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};