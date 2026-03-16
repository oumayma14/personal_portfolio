import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import quizpop from "../images/quizpop.png";

const projects = [
  {
    id: 1,
    title: "E-Learning Platform",
    description: "A platform that helps users learn through interactive quizzes and challenges.",
    image: quizpop,
    tags: ["React", "Bootstrap", "Node.js"],
    githubUrl: "https://github.com/oumayma14/e-learning-platform.git",
    demoUrl: null,
  },
];

/* 3-D magnetic tilt on hover */
const useMagnetic = () => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y  = ((e.clientY - r.top)  / r.height - 0.5) * 14;
    el.style.transform  = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    el.style.boxShadow  = `${-x * 1.5}px ${-y * 1.5}px 40px rgba(0,212,255,.18)`;
    el.style.transition = "box-shadow .08s, border-color .2s";
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform .5s ease, box-shadow .5s ease, border-color .3s";
    el.style.transform  = "";
    el.style.boxShadow  = "";
  };

  return { ref, onMouseMove, onMouseLeave };
};

const ProjectCard = ({ project, index, visible }) => {
  const mag = useMagnetic();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card-wrap ${visible ? "revealed" : ""}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div
        {...mag}
        ref={mag.ref}
        className="cyber-card group h-full flex flex-col overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={(e) => { setHovered(false); mag.onMouseLeave(e); }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              transition: "transform .6s ease, filter .5s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered
                ? "brightness(1) saturate(1.1)"
                : "brightness(.7) saturate(.6)",
            }}
          />
          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, var(--cyber-surface))",
            }}
          />
          {/* cyan tint on hover */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,212,255,.07)",
              opacity: hovered ? 1 : 0,
              transition: "opacity .4s",
            }}
          />
          {/* tags float over image */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="tech-tag" style={{ fontSize: ".65rem" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1rem",
              letterSpacing: ".04em",
              transition: "color .3s",
              color: hovered ? "var(--cyber-primary)" : "#fff",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm mb-5 flex-grow"
            style={{ color: "var(--cyber-text-muted)", lineHeight: 1.7 }}
          >
            {project.description}
          </p>

          {/* links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Github size={14} /> CODE
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{ color: "var(--cyber-primary)" }}
              >
                <ExternalLink size={14} /> LIVE DEMO
              </a>
            )}
            {/* animated arrow */}
            <span
              className="ms-auto"
              style={{
                color: "var(--cyber-primary)",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translate(0,0)" : "translate(-6px,6px)",
                transition: "all .3s",
              }}
            >
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-24 px-4 relative"
      id="projects"
      ref={sectionRef}
      style={{ background: "var(--cyber-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">

        {/* heading */}
        <h2 className={`section-title text-center reveal-title ${visible ? "revealed" : ""}`}>
          Featured <span className="hi">Projects</span>
        </h2>
        <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto reveal-sub ${visible ? "revealed" : ""}`}>
          Crafted with care — built for performance and an exceptional user experience.
        </p>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <ProjectCard key={project.id} project={project} index={key} visible={visible} />
          ))}
        </div>

        {/* github CTA */}
        <div className={`text-center mt-12 reveal-sub ${visible ? "revealed" : ""}`} style={{ transitionDelay: "400ms" }}>
          <a
            href="https://github.com/oumayma14"
            className="cyber-btn inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Check My GitHub <ArrowUpRight size={14} /></span>
          </a>
        </div>

      </div>
    </section>
  );
};