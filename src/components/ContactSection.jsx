import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const useReveal = (threshold = 0.1) => {
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

const contactItems = [
  {
    icon: <Mail  className="h-5 w-5" />,
    label: "EMAIL",
    value: "oumaima0fazani@gmail.com",
    href:  "mailto:oumaima0fazani@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "PHONE",
    value: "+216 54 259 484",
    href:  "tel:+21654259484",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "LOCATION",
    value: "Tunis, Tunisia",
    href:  null,
  },
];

export const ContactSection = () => {
  const [sectionRef, visible] = useReveal(0.08);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err"

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    emailjs
      .sendForm("service_z2jfyhr", "template_9v4g8cq", e.target, "QNx3iZHS3x9vr5Nav")
      .then(
        () => { setStatus("ok");  setIsSubmitting(false); e.target.reset(); },
        (err) => { setStatus("err"); setIsSubmitting(false); console.error(err.text); }
      );
  };

  return (
    <section
      className="py-24 px-4 relative"
      id="contact"
      ref={sectionRef}
      style={{ background: "var(--cyber-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">

        {/* heading */}
        <h2 className={cn("section-title text-center reveal-title", visible && "revealed")}>
          Get In <span className="hi">Touch</span>
        </h2>
        <p className={cn("text-center text-muted-foreground mb-12 max-w-2xl mx-auto reveal-sub", visible && "revealed")}>
          Looking to collaborate or have a project to share? I&apos;m always ready to connect
          and explore new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── Left — contact info ── */}
          <div className={cn("slide-in-left space-y-4", visible && "revealed")}>
            <h3
              className="mb-6"
              style={{
                fontFamily: "var(--font-head)",
                fontSize: ".8rem",
                letterSpacing: ".2em",
                color: "var(--cyber-primary)",
                textTransform: "uppercase",
              }}
            >
              // CONTACT_INFO
            </h3>

            {contactItems.map((item) => (
              <div key={item.label} className="contact-info-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: ".68rem",
                      letterSpacing: ".12em",
                      color: "var(--cyber-text-muted)",
                      marginBottom: ".2rem",
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors"
                      style={{ color: "var(--cyber-text)", fontSize: ".95rem" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: "var(--cyber-text)", fontSize: ".95rem" }}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* socials */}
            <div className="pt-4">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".68rem",
                  letterSpacing: ".12em",
                  color: "var(--cyber-text-muted)",
                  marginBottom: ".75rem",
                }}
              >
                SOCIAL_LINKS
              </p>
              <a
                href="https://www.linkedin.com/in/oumayma-fazzeni-jnfj1221/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon inline-flex hover:text-white transition-colors"
                style={{ color: "var(--cyber-primary)" }}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ── Right — form ── */}
          <div
            className={cn("stagger-card", visible && "revealed")}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="cyber-card p-8">
              <h3
                className="mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".2em",
                  color: "var(--cyber-primary)",
                }}
              >
                // SEND_MESSAGE
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: ".68rem",
                      letterSpacing: ".12em",
                      color: "var(--cyber-text-muted)",
                    }}
                  >
                    YOUR_NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    placeholder="Your name…"
                    className="cyber-input w-full"
                  />
                </div>

                {/* email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: ".68rem",
                      letterSpacing: ".12em",
                      color: "var(--cyber-text-muted)",
                    }}
                  >
                    YOUR_EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="you@example.com"
                    className="cyber-input w-full"
                  />
                </div>

                {/* message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: ".68rem",
                      letterSpacing: ".12em",
                      color: "var(--cyber-text-muted)",
                    }}
                  >
                    YOUR_MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Hello, I'd like to…"
                    className="cyber-input w-full"
                    style={{ minHeight: 120, resize: "vertical" }}
                  />
                </div>

                {/* status messages */}
                {status === "ok" && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: ".8rem", color: "var(--cyber-primary)" }}>
                    ✓ Message transmitted successfully.
                  </p>
                )}
                {status === "err" && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: ".8rem", color: "var(--cyber-accent2)" }}>
                    ✗ Transmission failed. Please try again.
                  </p>
                )}

                {/* submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn("cyber-btn w-full justify-center", isSubmitting && "opacity-60 cursor-not-allowed")}
                >
                  <span className="flex items-center gap-2 justify-center w-full">
                    {isSubmitting ? "Transmitting…" : "Send Message"}
                    <Send size={14} />
                  </span>
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};