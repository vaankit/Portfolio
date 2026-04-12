import { useEffect, useRef, useState } from "react";
import portrait from "./assets/ankit-portrait.jpg";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const HERO_METRICS = [
  { value: "+06", label: "Products shipped" },
  { value: "+07", label: "Years in tech" },
];

const SERVICES = [
  {
    step: "01",
    name: "AI workflow systems",
    copy:
      "I design and ship AI flows that include review layers, clean handoffs, and business logic that teams can actually trust in production.",
  },
  {
    step: "02",
    name: "Local-first intelligence",
    copy:
      "From Ollama-based research tooling to privacy-sensitive automation, I build systems where control, speed, and data boundaries still matter.",
  },
  {
    step: "03",
    name: "Operational interfaces",
    copy:
      "Dashboards, internal tools, and public-facing products that turn messy inputs into calm, usable outputs for real operators.",
  },
];

const EXPERIENCE = [
  {
    org: "ANZ Bank",
    role: "Technology Mobility Consultant",
    scope: "Delivered mobility work across a 7,500+ device environment with enterprise-grade rollout expectations.",
  },
  {
    org: "NZ Parliament",
    role: "M365 Migration Analyst",
    scope: "Supported high-visibility migration work for 120+ MPs, Ministers, and teams including the PMO ecosystem.",
  },
  {
    org: "Ministry of Justice",
    role: "Intune and Autopilot",
    scope: "Worked on endpoint modernization patterns, device readiness, and deployment workflows at government scale.",
  },
  {
    org: "NZ Police",
    role: "iPhone Refresh",
    scope: "Contributed to fleet rollout and refresh operations where repeatability and execution quality mattered.",
  },
];

const CERTIFICATIONS = [
  { name: "MD-102", detail: "Endpoint Administrator" },
  { name: "AI-900", detail: "Azure AI Fundamentals" },
  { name: "CTech", detail: "Certified Technologist" },
  { name: "Cyber Security", detail: "InfoSec Professional" },
];

const SOCIALS = [
  {
    label: "GitHub",
    value: "github.com/vaankit",
    href: "https://github.com/vaankit",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ankitvaghela",
    href: "https://linkedin.com/in/ankitvaghela",
  },
  {
    label: "Email",
    value: "vaankit21@gmail.com",
    href: "mailto:vaankit21@gmail.com",
  },
];

const PROJECTS = [
  {
    id: "ac-thematic",
    name: "AC Thematic Analyser",
    tagline: "Qualitative research analysis powered by local AI",
    description:
      "Full-stack Python and Flask app that accepts PDF uploads, extracts text, chunks with overlap, and runs thematic coding via local Ollama models. Returns structured analysis with themes, sentiment, stakeholder breakdowns, and coded passages with confidence scores.",
    tech: ["Python", "Flask", "Ollama", "pdfplumber", "Local LLM"],
    status: "Live",
    loom: "https://www.loom.com/share/bec58746e80a4bc698332449dcc0ad89",
    github: null,
    live: null,
    metric: "94-second Loom demo video",
  },
  {
    id: "apex-terminal",
    name: "APEX Terminal",
    tagline: "Bloomberg-replacement financial intelligence platform",
    description:
      "Multi-provider financial data terminal aggregating six API providers across 50+ exchanges. Built as an open-source alternative to expensive institutional market intelligence tooling.",
    tech: ["React", "Python", "REST APIs", "WebSocket", "D3.js"],
    status: "Live",
    loom: null,
    github: "https://github.com/vaankit",
    live: null,
    metric: "6 API providers and 50+ exchanges",
  },
  {
    id: "wellington-shield",
    name: "Wellington Shield",
    tagline: "AI-powered property insurance quoting platform",
    description:
      "Automated insurance quoting engine for NZ property that ingests risk data and policy parameters to generate faster, more consistent quoting outputs.",
    tech: ["Next.js", "AI/ML", "Node.js", "PostgreSQL"],
    status: "Beta",
    loom: null,
    github: "https://github.com/vaankit/shield-ai-quote",
    live: "https://shield-ai-quote.onrender.com/",
    metric: "Instant quote generation",
  },
  {
    id: "mapped-nz",
    name: "Mapped.NZ",
    tagline: "NZ government statistics visualisation",
    description:
      "Interactive visualisation platform rendering New Zealand government statistics into clearer maps and dashboards for researchers, journalists, and policy analysts.",
    tech: ["React", "D3.js", "Mapbox", "Government APIs"],
    status: "Live",
    loom: null,
    github: "https://github.com/vaankit/mapped-nz",
    live: "https://mapped-nz.onrender.com/",
    metric: "Public data made explorable",
  },
  {
    id: "spot-pro",
    name: "Spot Pro",
    tagline: "Done-for-you B2B automation consulting",
    description:
      "Productized service offering end-to-end workflow automation for B2B companies using n8n, Make, Zapier, APIs, and repeatable delivery patterns.",
    tech: ["n8n", "Make", "Zapier", "APIs", "Consulting"],
    status: "Beta",
    loom: null,
    github: "https://github.com/vaankit/spot-pro",
    live: "https://process-pioneer-pro.lovable.app/",
    metric: "Monthly retainer model",
  },
  {
    id: "spot-ai",
    name: "Spot.AI",
    tagline: "ABM landing page and AI marketing assistant",
    description:
      "Client-facing full-stack services studio for the Spot.AI ecosystem with marketing generation, public holiday planning, streaming assistant output, review stages, audit trails, and NZ-aligned compliance screening.",
    tech: ["Node.js", "Express", "Supabase", "Gemini", "Vanilla JS"],
    status: "Live",
    loom: "https://www.loom.com/share/5f6d1f22fc7f435a85ff5ae8e4d48a6e",
    github: "https://github.com/vaankit/spot-ai-services-studio",
    live: null,
    metric: "4 production services",
  },
];

function useInView(ref, threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isVisible = useInView(ref);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true" />;
}

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.github && (
        <a
          className="project-link"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      )}
      {project.live && (
        <a
          className="project-link"
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Site
        </a>
      )}
      {project.loom && (
        <a
          className="project-link"
          href={project.loom}
          target="_blank"
          rel="noopener noreferrer"
        >
          Loom Demo Video
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const isFeatured = index === 0;

  return (
    <Reveal delay={index * 0.08}>
      <article className={`project-card${isFeatured ? " featured" : ""}`}>
        <div>
          <div className="project-top">
            <span className="project-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="project-status">{project.status}</span>
          </div>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-metric">{project.metric}</div>
        </div>

        <div>
          <div className="project-tech">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </article>
    </Reveal>
  );
}

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const year = new Date().getFullYear();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "6b6971b0-ae94-4fc5-adcd-8a4302f4fb1d",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: "AV Portfolio",
          to: "vaankit21@gmail.com",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div className="portfolio-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #f2ede3;
          --paper: #fbf7f0;
          --ink: #111110;
          --muted: #5f5a52;
          --line: rgba(17, 17, 16, 0.14);
          --line-strong: rgba(17, 17, 16, 0.22);
          --soft-shadow: 0 24px 70px rgba(17, 17, 16, 0.08);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 88px;
        }

        body {
          min-width: 320px;
          background: var(--bg);
        }

        body,
        input,
        textarea,
        button {
          font-family: "Manrope", sans-serif;
        }

        img {
          display: block;
          max-width: 100%;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        ::selection {
          background: rgba(17, 17, 16, 0.16);
          color: var(--ink);
        }

        #about,
        #portfolio,
        #services,
        #contact {
          scroll-margin-top: 88px;
        }

        .portfolio-page {
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at top center, rgba(255, 255, 255, 0.72), transparent 38%),
            linear-gradient(180deg, #f8f3eb 0%, #f0eadf 100%);
        }

        .portfolio-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(17, 17, 16, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 17, 16, 0.03) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.18), transparent 72%);
        }

        .page-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 1360px);
          margin: 0 auto;
          padding: 24px 28px 96px;
        }

        .site-header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .site-caption,
        .site-year,
        .screen-kicker,
        .nav-chip,
        .screen-nav a,
        .screen-footer,
        .section-kicker,
        .project-status,
        .project-index,
        .project-tech span,
        .project-link,
        .service-step,
        .timeline-role,
        .social-pill,
        .form-label,
        .footer-meta {
          font-family: "JetBrains Mono", monospace;
        }

        .brand-mark {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          position: relative;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.62);
        }

        .brand-mark::before,
        .brand-mark::after {
          content: "";
          position: absolute;
          transform: rotate(45deg);
        }

        .brand-mark::before {
          width: 12px;
          height: 12px;
          border: 2px solid var(--ink);
        }

        .brand-mark::after {
          width: 6px;
          height: 6px;
          background: var(--ink);
        }

        .site-caption,
        .site-year {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.7);
        }

        .site-caption {
          justify-self: center;
        }

        .hero-section {
          position: relative;
          padding: 28px 0 108px;
        }

        .ghost-word {
          position: absolute;
          left: 50%;
          top: 36%;
          transform: translate(-50%, -50%);
          font-size: clamp(112px, 23vw, 320px);
          letter-spacing: 0.22em;
          font-weight: 800;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.05);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .laptop-scene {
          position: relative;
          z-index: 2;
          width: min(100%, 1120px);
          margin: 48px auto 0;
        }

        .laptop-wrap {
          transform: perspective(1800px) rotateX(7deg) rotateY(-15deg) rotateZ(-3deg);
          transform-style: preserve-3d;
          filter: drop-shadow(0 38px 65px rgba(17, 17, 16, 0.15));
        }

        .laptop-screen {
          position: relative;
          overflow: hidden;
          padding: 22px;
          border: 3px solid #2a2927;
          border-radius: 32px 32px 18px 18px;
          background: linear-gradient(180deg, #fcf8f1 0%, #f5efe6 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.65);
        }

        .laptop-screen::after {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 22px 22px 10px 10px;
          border: 1px solid rgba(17, 17, 16, 0.08);
          pointer-events: none;
        }

        .screen-topbar {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 20px;
          padding: 4px 6px 18px;
        }

        .screen-nav {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .screen-nav a {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.68);
        }

        .nav-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.7);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .screen-body {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 20px;
          min-height: 540px;
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 18%);
        }

        .screen-side-note {
          position: absolute;
          left: 12px;
          top: 112px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.28);
          z-index: 2;
        }

        .screen-left {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
          padding: 44px 36px 34px 58px;
        }

        .hero-metrics {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }

        .hero-metric {
          min-width: 104px;
        }

        .hero-metric-value {
          font-size: 40px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .hero-metric-label {
          margin-top: 8px;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.48);
          font-family: "JetBrains Mono", monospace;
        }

        .hero-copy {
          max-width: 460px;
        }

        .screen-kicker {
          margin-bottom: 10px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.42);
        }

        .hero-title {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-size: clamp(74px, 9vw, 142px);
          line-height: 0.9;
          letter-spacing: -0.05em;
          font-weight: 400;
        }

        .hero-subtitle {
          margin-top: 12px;
          max-width: 320px;
          font-size: 14px;
          color: rgba(17, 17, 16, 0.7);
        }

        .hero-description {
          margin-top: 26px;
          max-width: 460px;
          font-size: 18px;
          line-height: 1.75;
          color: rgba(17, 17, 16, 0.78);
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .hero-link,
        .social-pill,
        .project-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.74);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .hero-link:hover,
        .nav-chip:hover,
        .social-pill:hover,
        .project-link:hover {
          transform: translateY(-2px);
          background: #ffffff;
          border-color: rgba(17, 17, 16, 0.32);
        }

        .screen-photo-panel {
          position: relative;
          min-height: 100%;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(17, 17, 16, 0.04), rgba(17, 17, 16, 0.1));
        }

        .screen-photo-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 40%, rgba(17, 17, 16, 0.15));
        }

        .screen-photo-panel::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          z-index: 2;
          height: 32%;
          background: linear-gradient(180deg, transparent, rgba(243, 238, 229, 0.9));
        }

        .hero-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 72% 28%;
          filter: grayscale(100%) contrast(1.08) brightness(1.06);
          transform: scale(1.03);
        }

        .screen-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 4px 2px;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.45);
        }

        .laptop-base {
          position: relative;
          width: 88%;
          height: 34px;
          margin: 0 auto;
          transform: translateY(-1px);
          border-radius: 0 0 20px 20px;
          background: linear-gradient(180deg, #d8d2ca 0%, #b6b0a9 100%);
          box-shadow: 0 18px 28px rgba(17, 17, 16, 0.12);
        }

        .laptop-base::before {
          content: "";
          position: absolute;
          inset: 0;
          clip-path: polygon(6% 0, 94% 0, 100% 100%, 0 100%);
          border-radius: 0 0 22px 22px;
          background: linear-gradient(180deg, #d1cbc3 0%, #a7a19a 100%);
        }

        .laptop-base::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 8px;
          transform: translateX(-50%);
          width: 28%;
          height: 8px;
          border-radius: 999px;
          background: rgba(92, 86, 80, 0.28);
        }

        .section {
          position: relative;
          padding: 96px 0;
        }

        .section-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 42px;
          align-items: start;
        }

        .section-kicker {
          margin-bottom: 18px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.42);
        }

        .section-title {
          max-width: 520px;
          font-size: clamp(38px, 5vw, 74px);
          line-height: 0.96;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .section-title.serif,
        .contact-heading .serif {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-weight: 400;
        }

        .section-description {
          margin-top: 18px;
          max-width: 520px;
          font-size: 18px;
          line-height: 1.8;
          color: rgba(17, 17, 16, 0.72);
        }

        .overview-card {
          padding: 30px;
          border-radius: 30px;
          border: 1px solid rgba(17, 17, 16, 0.1);
          background: rgba(255, 255, 255, 0.62);
          box-shadow: var(--soft-shadow);
        }

        .eyebrow-list {
          display: grid;
          gap: 18px;
        }

        .service-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 18px;
          padding: 22px 0;
          border-top: 1px solid rgba(17, 17, 16, 0.12);
        }

        .service-card:first-child {
          padding-top: 0;
          border-top: none;
        }

        .service-step {
          padding-top: 4px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.38);
        }

        .service-name {
          font-size: 26px;
          letter-spacing: -0.04em;
          font-weight: 700;
        }

        .service-copy {
          margin-top: 8px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(17, 17, 16, 0.68);
        }

        .accent-line {
          width: 100%;
          height: 1px;
          margin: 28px 0;
          background: linear-gradient(90deg, rgba(17, 17, 16, 0.4), rgba(17, 17, 16, 0.04));
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 26px;
        }

        .cert-card {
          padding: 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(17, 17, 16, 0.1);
          background: rgba(255, 255, 255, 0.74);
        }

        .cert-name {
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .cert-detail {
          margin-top: 6px;
          font-size: 13px;
          color: rgba(17, 17, 16, 0.58);
        }

        .social-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-top: 38px;
        }

        .project-card {
          padding: 28px;
          border-radius: 28px;
          border: 1px solid rgba(17, 17, 16, 0.12);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 22px 42px rgba(17, 17, 16, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card.featured {
          grid-column: span 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 28px;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 48px rgba(17, 17, 16, 0.09);
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
        }

        .project-index {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.36);
        }

        .project-status {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(17, 17, 16, 0.12);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.52);
        }

        .project-name {
          margin-top: 24px;
          max-width: 320px;
          font-size: 34px;
          line-height: 0.96;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .project-card.featured .project-name {
          max-width: 420px;
          font-size: 50px;
        }

        .project-tagline {
          margin-top: 10px;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.44);
        }

        .project-description {
          margin-top: 18px;
          max-width: 560px;
          font-size: 15px;
          line-height: 1.85;
          color: rgba(17, 17, 16, 0.68);
        }

        .project-metric {
          margin-top: 18px;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.48);
          font-family: "JetBrains Mono", monospace;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .project-tech span {
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(17, 17, 16, 0.1);
          background: rgba(255, 255, 255, 0.78);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.56);
        }

        .project-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .timeline {
          display: grid;
          gap: 14px;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 18px;
          padding: 22px 0;
          border-top: 1px solid rgba(17, 17, 16, 0.12);
        }

        .timeline-item:first-child {
          padding-top: 0;
          border-top: none;
        }

        .timeline-org {
          font-size: 22px;
          letter-spacing: -0.04em;
          font-weight: 700;
        }

        .timeline-role {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(17, 17, 16, 0.42);
        }

        .timeline-scope {
          margin-top: 8px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(17, 17, 16, 0.66);
        }

        .contact-panel {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: 28px;
          padding: 34px;
          border-radius: 32px;
          background: #171614;
          color: #f4efe6;
          box-shadow: 0 30px 60px rgba(17, 17, 16, 0.15);
        }

        .contact-panel .section-kicker,
        .contact-panel .contact-copy,
        .contact-panel .contact-link-label,
        .contact-panel .contact-link-value,
        .contact-panel .form-feedback {
          color: rgba(244, 239, 230, 0.72);
        }

        .contact-heading {
          font-size: clamp(34px, 5vw, 70px);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .contact-copy {
          margin-top: 18px;
          max-width: 340px;
          font-size: 17px;
          line-height: 1.8;
        }

        .contact-links {
          display: grid;
          gap: 12px;
          margin-top: 28px;
        }

        .contact-link {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          padding: 14px 0;
          border-top: 1px solid rgba(244, 239, 230, 0.12);
        }

        .contact-link:first-child {
          padding-top: 0;
          border-top: none;
        }

        .contact-link-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .contact-link-value {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .form-shell {
          padding: 24px;
          border-radius: 28px;
          border: 1px solid rgba(244, 239, 230, 0.12);
          background: rgba(255, 255, 255, 0.06);
        }

        .form-grid {
          display: grid;
          gap: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(244, 239, 230, 0.5);
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(244, 239, 230, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: #f4efe6;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: rgba(244, 239, 230, 0.34);
          transform: translateY(-1px);
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }

        .form-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
          padding: 16px 20px;
          border: none;
          border-radius: 999px;
          background: #f4efe6;
          color: #171614;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .form-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .form-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .form-feedback {
          font-size: 13px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 36px 0 0;
          color: rgba(17, 17, 16, 0.5);
          font-size: 13px;
        }

        .footer-meta {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .reveal {
          will-change: opacity, transform;
        }

        @media (max-width: 1180px) {
          .page-shell {
            padding-inline: 22px;
          }

          .ghost-word {
            top: 32%;
            font-size: clamp(100px, 20vw, 240px);
          }

          .laptop-wrap {
            transform: perspective(1600px) rotateX(6deg) rotateY(-10deg) rotateZ(-2deg);
          }

          .screen-body {
            min-height: 500px;
          }
        }

        @media (max-width: 980px) {
          .site-header {
            grid-template-columns: auto 1fr;
          }

          .site-caption {
            order: 3;
            grid-column: 1 / -1;
            justify-self: start;
          }

          .site-year {
            justify-self: end;
          }

          .ghost-word {
            display: none;
          }

          .laptop-wrap {
            transform: none;
          }

          .screen-topbar {
            grid-template-columns: 1fr;
            justify-items: start;
          }

          .screen-nav {
            justify-content: flex-start;
          }

          .screen-body,
          .section-grid,
          .contact-panel,
          .timeline-item,
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .screen-body {
            min-height: unset;
          }

          .screen-side-note {
            display: none;
          }

          .screen-left {
            padding: 28px 26px 12px;
          }

          .screen-photo-panel {
            min-height: 420px;
          }

          .screen-footer {
            padding: 14px 8px 6px;
          }

          .project-card.featured {
            grid-column: span 1;
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .page-shell {
            padding: 20px 16px 80px;
          }

          .hero-section {
            padding-bottom: 72px;
          }

          .screen-nav {
            gap: 12px;
          }

          .screen-nav a,
          .site-caption,
          .site-year {
            font-size: 9px;
          }

          .screen-left {
            padding: 24px 18px 10px;
          }

          .hero-title {
            font-size: clamp(64px, 19vw, 102px);
          }

          .hero-description,
          .section-description,
          .contact-copy {
            font-size: 16px;
          }

          .hero-actions,
          .project-links,
          .social-row {
            gap: 10px;
          }

          .hero-link,
          .social-pill,
          .project-link,
          .form-button {
            width: 100%;
          }

          .hero-metrics {
            gap: 18px;
          }

          .section {
            padding: 76px 0;
          }

          .overview-card,
          .project-card,
          .contact-panel,
          .form-shell {
            padding: 24px;
          }

          .cert-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 540px) {
          .site-header {
            gap: 12px;
          }

          .screen-topbar {
            gap: 14px;
          }

          .screen-nav {
            gap: 10px 12px;
          }

          .hero-metric-value {
            font-size: 30px;
          }

          .screen-photo-panel {
            min-height: 320px;
          }

          .hero-portrait {
            object-position: 70% 26%;
          }

          .section-title,
          .contact-heading {
            font-size: clamp(32px, 13vw, 48px);
          }

          .project-name {
            font-size: 28px;
          }

          .project-card.featured .project-name {
            font-size: 34px;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="page-shell">
        <header className="site-header">
          <a href="#top" aria-label="Ankit Vaghela home">
            <BrandMark />
          </a>
          <div className="site-caption">Personal portfolio website</div>
          <div className="site-year">{year}</div>
        </header>

        <main>
          <section className="hero-section" id="top">
            <div className="ghost-word">Portfolio</div>

            <Reveal>
              <div className="laptop-scene">
                <div className="laptop-wrap">
                  <div className="laptop-screen">
                    <div className="screen-topbar">
                      <BrandMark />

                      <nav className="screen-nav" aria-label="Primary navigation">
                        {NAV_LINKS.map((item) => (
                          <a key={item.href} href={item.href}>
                            {item.label}
                          </a>
                        ))}
                      </nav>

                      <a className="nav-chip" href="#contact">
                        Book A Call
                      </a>
                    </div>

                    <div className="screen-body">
                      <div className="screen-side-note">
                        AI workflow architect - Wellington
                      </div>

                      <div className="screen-left">
                        <div className="hero-metrics">
                          {HERO_METRICS.map((item) => (
                            <div key={item.label} className="hero-metric">
                              <div className="hero-metric-value">{item.value}</div>
                              <div className="hero-metric-label">{item.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="hero-copy">
                          <div className="screen-kicker">AI workflows and automation</div>
                          <h1 className="hero-title">Hello</h1>
                          <p className="hero-subtitle">
                            It&apos;s Ankit, an AI workflow architect for modern teams.
                          </p>
                          <p className="hero-description">
                            I build AI workflows, local-first tools, and production
                            automation that feel simple to use and hard to break.
                          </p>

                          <div className="hero-actions">
                            <a className="hero-link" href="#portfolio">
                              View portfolio
                            </a>
                            <a
                              className="hero-link"
                              href="https://github.com/vaankit"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              GitHub
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="screen-photo-panel">
                        <img
                          className="hero-portrait"
                          src={portrait}
                          alt="Portrait of Ankit Vaghela"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="screen-footer">
                      <span>Wellington, New Zealand</span>
                      <a href="#portfolio">Scroll down</a>
                    </div>
                  </div>

                  <div className="laptop-base" />
                </div>
              </div>
            </Reveal>
          </section>

          <section className="section" id="about">
            <div className="section-grid">
              <Reveal>
                <div>
                  <div className="section-kicker">About</div>
                  <h2 className="section-title">
                    A builder who likes clean interfaces and complicated systems.
                  </h2>
                  <p className="section-description">
                    I work at the intersection of enterprise delivery and product
                    execution. That means I can move comfortably between endpoint
                    programs, internal tooling, local AI workflows, and public-facing
                    products without losing the user in the process.
                  </p>

                  <div className="accent-line" />

                  <div className="cert-grid">
                    {CERTIFICATIONS.map((item) => (
                      <div key={item.name} className="cert-card">
                        <div className="cert-name">{item.name}</div>
                        <div className="cert-detail">{item.detail}</div>
                      </div>
                    ))}
                  </div>

                  <div className="social-row">
                    {SOCIALS.map((item) => (
                      <a
                        key={item.label}
                        className="social-pill"
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="overview-card">
                  <div className="section-kicker">Services</div>
                  <div className="eyebrow-list">
                    {SERVICES.map((item) => (
                      <div key={item.step} className="service-card">
                        <div className="service-step">{item.step}</div>
                        <div>
                          <div className="service-name">{item.name}</div>
                          <p className="service-copy">{item.copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section" id="portfolio">
            <Reveal>
              <div>
                <div className="section-kicker">Selected work</div>
                <h2 className="section-title serif">Practical products, shipped with intent.</h2>
                <p className="section-description">
                  A mix of local AI research tooling, financial interfaces,
                  automation products, marketing systems, and data visualization
                  work built for actual use rather than portfolio theater.
                </p>
              </div>
            </Reveal>

            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>

          <section className="section" id="services">
            <div className="section-grid">
              <Reveal>
                <div>
                  <div className="section-kicker">Background</div>
                  <h2 className="section-title">
                    Enterprise delivery discipline, product-minded execution.
                  </h2>
                  <p className="section-description">
                    My background across banking, government, and large endpoint
                    programs shaped how I build today: clear process, strong
                    rollout thinking, and outputs that are ready for real teams
                    rather than just design reviews.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="overview-card">
                  <div className="timeline">
                    {EXPERIENCE.map((item) => (
                      <div key={item.org} className="timeline-item">
                        <div>
                          <div className="timeline-org">{item.org}</div>
                          <div className="timeline-role">{item.role}</div>
                        </div>
                        <p className="timeline-scope">{item.scope}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section" id="contact">
            <Reveal>
              <div className="contact-panel">
                <div>
                  <div className="section-kicker">Contact</div>
                  <h2 className="contact-heading">
                    Let&apos;s build something <span className="serif">worth shipping.</span>
                  </h2>
                  <p className="contact-copy">
                    If you need help designing an AI workflow, untangling an
                    internal process, or building a calmer product experience, send
                    me a note.
                  </p>

                  <div className="contact-links">
                    {SOCIALS.map((item) => (
                      <a
                        key={item.label}
                        className="contact-link"
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        <span className="contact-link-label">{item.label}</span>
                        <span className="contact-link-value">{item.value}</span>
                      </a>
                    ))}

                    <div className="contact-link">
                      <span className="contact-link-label">Location</span>
                      <span className="contact-link-value">Wellington, New Zealand</span>
                    </div>
                  </div>
                </div>

                <div className="form-shell">
                  {formStatus === "sent" ? (
                    <div className="form-feedback">
                      Message sent. I&apos;ll get back to you shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="form-grid">
                      <div>
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          id="name"
                          className="form-input"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                          }
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          className="form-input"
                          type="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          inputMode="email"
                          value={formData.email}
                          onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                          }
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="form-label" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="form-textarea"
                          value={formData.message}
                          onChange={(event) =>
                            setFormData({ ...formData, message: event.target.value })
                          }
                          placeholder="Tell me about the workflow, product, or problem."
                        />
                      </div>

                      <button
                        className="form-button"
                        type="submit"
                        disabled={
                          formStatus === "sending" ||
                          !formData.name ||
                          !formData.email ||
                          !formData.message
                        }
                      >
                        {formStatus === "sending"
                          ? "Sending"
                          : formStatus === "error"
                            ? "Try again"
                            : "Send message"}
                      </button>

                      {formStatus === "error" && (
                        <div className="form-feedback">
                          Something went wrong. Please try again or email me directly.
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <footer className="footer">
          <div>Designed and built for a cleaner, more editorial presentation.</div>
          <div className="footer-meta">Ankit Vaghela - Wellington, NZ</div>
        </footer>
      </div>
    </div>
  );
}
