import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { name: "Home",     href: "#hero"     },
  { name: "About",    href: "#about"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact"  },
];

const socials = [
  { icon: <Github   className="h-4 w-4" />, href: "https://github.com/oumayma14",                              label: "GitHub"   },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/oumayma-fazzeni-jnfj1221/",    label: "LinkedIn" },
  { icon: <Mail     className="h-4 w-4" />, href: "mailto:oumaima0fazani@gmail.com",                           label: "Email"    },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-border px-4"
      style={{ background: "#020810", fontFamily: "var(--font-mono)" }}
    >
      {/* top glow line */}
      <div style={{
        position: "absolute", top: -1, left: 0,
        width: "100%", height: 1,
        background: "linear-gradient(90deg, transparent, var(--cyber-primary), transparent)",
        opacity: .5,
      }} />

      {/* main row */}
      <div
        className="container mx-auto py-10 flex flex-wrap gap-8 justify-between items-start"
        style={{ maxWidth: "1024px" }}
      >

        {/* brand */}
        <div>
          <a
            href="#hero"
            className="nav-logo mb-3 inline-flex items-center gap-1"
            style={{ fontSize: "1.1rem", textDecoration: "none" }}
          >
            <span className="logo-bracket">&lt;</span>
            <span style={{ color: "#fff" }}>Oumayma</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
          <p style={{ fontSize: ".75rem", color: "var(--cyber-text-muted)", maxWidth: 220, lineHeight: 1.7 }}>
            Engineering student · Full-stack developer · Data science enthusiast.
          </p>
        </div>

        {/* nav */}
        <div>
          <p style={{ fontSize: ".65rem", letterSpacing: ".15em", color: "var(--cyber-primary)", marginBottom: ".75rem" }}>
            NAVIGATION
          </p>
          <ul className="space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    fontSize: ".78rem",
                    color: "var(--cyber-text-muted)",
                    textDecoration: "none",
                    letterSpacing: ".08em",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--cyber-primary)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--cyber-text-muted)")}
                >
                  <span style={{ color: "var(--cyber-primary)", opacity: .5, marginRight: ".4rem" }}>›</span>
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* socials */}
        <div>
          <p style={{ fontSize: ".65rem", letterSpacing: ".15em", color: "var(--cyber-primary)", marginBottom: ".75rem" }}>
            CONNECT
          </p>
          <div className="flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontSize: ".78rem",
                  color: "var(--cyber-text-muted)",
                  textDecoration: "none",
                  letterSpacing: ".08em",
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--cyber-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--cyber-text-muted)"; }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* bottom bar */}
      <div
        className="container mx-auto py-4 flex flex-wrap justify-between items-center gap-4"
        style={{
          maxWidth: "1024px",
          borderTop: "1px solid var(--cyber-border)",
          fontSize: ".72rem",
          color: "var(--cyber-text-muted)",
        }}
      >
        <span>
          © {year}{" "}
          <span style={{ color: "var(--cyber-primary)" }}>Oumayma Fazzeni</span>
          {" "}— All systems nominal.
        </span>

        <a
          href="#hero"
          className="back-to-top"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </a>
      </div>

    </footer>
  );
};