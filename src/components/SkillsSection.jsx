import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

const skills = [
  { name: "HTML/CSS",     level: 87, category: "frontend"    },
  { name: "JavaScript",   level: 78, category: "frontend"    },
  { name: "React",        level: 90, category: "frontend"    },
  { name: "Bootstrap",    level: 87, category: "frontend"    },
  { name: "Angular",      level: 69, category: "frontend"    },
  { name: "TypeScript",   level: 73, category: "frontend"    },
  { name: "Node.js",      level: 48, category: "backend"     },
  { name: "Express",      level: 89, category: "backend"     },
  { name: "MongoDB",      level: 78, category: "backend"     },
  { name: "MySQL",        level: 80, category: "backend"     },
  { name: "Git & GitHub", level: 88, category: "tools"       },
  { name: "Postman",      level: 94, category: "tools"       },
  { name: "Linux",        level: 70, category: "tools"       },
  { name: "Python",       level: 90, category: "programming" },
  { name: "C",            level: 95, category: "programming" },
  { name: "C#",           level: 67, category: "programming" },
];

const categories = ["all", "frontend", "backend", "tools", "programming"];

const levelLabel = (l) => l >= 85 ? "EXPERT" : l >= 70 ? "PROFICIENT" : "LEARNING";
const levelColor = (l) => l >= 85 ? "var(--cyber-primary)" : l >= 70 ? "var(--cyber-accent)" : "var(--cyber-accent2)";

/* counts up from 0 to target when run=true */
const Counter = ({ target, run }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) { setVal(0); return; }
    let cur = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(cur);
      if (cur >= target) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [run, target]);
  return <>{val}</>;
};

/* individual card — observes itself */
const SkillCard = ({ skill, index, animate }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!animate) { setInView(false); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animate]);

  const delay = `${(index % 3) * 80}ms`;

  return (
    <div
      ref={ref}
      className={cn("skill-card-wrap", inView && "revealed")}
      style={{ transitionDelay: delay }}
    >
      <div className="bg-card p-6 cyber-card skill-card">

        {/* name + badge */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="skill-name">{skill.name}</h3>
          <span
            className="skill-badge"
            style={{ color: levelColor(skill.level), borderColor: levelColor(skill.level) }}
          >
            {levelLabel(skill.level)}
          </span>
        </div>

        {/* bar */}
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{
              width: inView ? skill.level + "%" : "0%",
              transition: `width 1s cubic-bezier(.4,0,.2,1) ${delay}`,
            }}
          />
        </div>

        {/* counter */}
        <div className="text-right mt-1">
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-mono)", color: "var(--cyber-primary)" }}
          >
            <Counter target={skill.level} run={inView} />%
          </span>
        </div>

      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [fading,         setFading]         = useState(false);
  const [displayed,      setDisplayed]      = useState("all");
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  /* section enter */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSectionVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* filter with fade transition */
  const handleFilter = (cat) => {
    if (cat === activeCategory || fading) return;
    setFading(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setDisplayed(cat);
      setFading(false);
    }, 200);
  };

  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 relative"
    >
      <div className="container mx-auto max-w-5xl">

        {/* heading */}
        <h2 className={cn("section-title text-center reveal-title", sectionVisible && "revealed")}>
          My <span className="hi">Skills</span>
        </h2>

        {/* filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={cn("cat-btn capitalize", activeCategory === cat && "active")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 skills-grid", fading && "fading")}>
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              animate={sectionVisible && !fading}
            />
          ))}
        </div>

      </div>
    </section>
  );
};