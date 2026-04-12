import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "ac-thematic",
    name: "AC Thematic Analyser",
    tagline: "Qualitative research analysis powered by local AI",
    description:
      "Full-stack Python/Flask app that accepts PDF uploads, extracts text, chunks with overlap, and runs thematic coding via local Ollama models. Returns structured analysis: themes ranked by frequency, sentiment overview, stakeholder breakdowns, and coded passages with confidence scores. 100% local — zero data leaves the machine.",
    tech: ["Python", "Flask", "Ollama", "pdfplumber", "Local LLM"],
    status: "Live",
    color: "#00E5A0",
    loom: "https://www.loom.com/share/bec58746e80a4bc698332449dcc0ad89",
    github: null,
    live: null,
    featured: true,
    metric: "94-sec demo video produced",
  },
  {
    id: "apex-terminal",
    name: "APEX Terminal",
    tagline: "Bloomberg-replacement financial intelligence platform",
    description:
      "Multi-provider financial data terminal aggregating 6 API providers across 50+ exchanges. Real-time market data, portfolio analytics, and institutional-grade charting — built as an open-source alternative to $24k/year Bloomberg terminals.",
    tech: ["React", "Python", "REST APIs", "WebSocket", "D3.js"],
    status: "Live",
    color: "#FFB800",
    loom: null,
    github: "https://github.com/vaankit",
    live: null,
    featured: true,
    metric: "6 API providers · 50+ exchanges",
  },
  {
    id: "wellington-shield",
    name: "Wellington Shield",
    tagline: "AI-powered property insurance quoting platform",
    description:
      "Automated insurance quoting engine for NZ property. Ingests property data, risk profiles, and policy parameters to generate instant quotes with AI-driven risk assessment and pricing models.",
    tech: ["Next.js", "AI/ML", "Node.js", "PostgreSQL"],
    status: "Beta",
    color: "#6C63FF",
    loom: null,
    github: "https://github.com/vaankit/shield-ai-quote",
    live: "https://shield-ai-quote.onrender.com/",
    featured: false,
    metric: "Instant quote generation",
  },
  {
    id: "mapped-nz",
    name: "Mapped.NZ",
    tagline: "NZ government statistics visualisation",
    description:
      "Interactive data visualisation platform rendering New Zealand government statistics into explorable maps and dashboards. Makes public data accessible and actionable for researchers, journalists, and policy analysts.",
    tech: ["React", "D3.js", "Mapbox", "Government APIs"],
    status: "Live",
    color: "#00B4D8",
    loom: null,
    github: "https://github.com/vaankit/mapped-nz",
    live: "https://mapped-nz.onrender.com/",
    featured: false,
    metric: "NZ public data, visualised",
  },
  {
    id: "spot-pro",
    name: "Spot Pro",
    tagline: "Done-for-you B2B automation consulting",
    description:
      "Productised service offering end-to-end workflow automation for B2B companies. Monthly retainer model covering audit, build, and optimisation of business processes using n8n, Make, Zapier, and custom API integrations.",
    tech: ["n8n", "Make", "Zapier", "APIs", "Consulting"],
    status: "Beta",
    color: "#FF6B6B",
    loom: null,
    github: "https://github.com/vaankit/spot-pro",
    live: "https://process-pioneer-pro.lovable.app/",
    featured: false,
    metric: "Monthly retainer model",
  },
  {
    id: "spot-ai",
    name: "Spot.AI",
    tagline: "ABM Landing page + Full AI-powered Marketing Assistant",
    description:
      "Client-facing full-stack services studio for the Spot.AI ABM ecosystem. Includes realtime marketing material generation, marketing email generation, a public holiday and long-weekend planner, and a marketing assistant with streamed output, review stages, audit trails, per-user usage tracking, and NZ-aligned compliance screening.",
    tech: ["Node.js", "Express", "Supabase", "Gemini", "Vanilla JS", "date-holidays"],
    status: "Live",
    color: "#E040FB",
    loom: null,
    github: "https://github.com/vaankit/spot-ai-services-studio",
    live: null,
    featured: false,
    metric: "4 production services · NZ review pipeline",
  },
];

const CERTIFICATIONS = [
  { name: "MD-102", detail: "Endpoint Administrator" },
  { name: "AI-900", detail: "Azure AI Fundamentals" },
  { name: "CTech", detail: "Certified Technologist" },
  { name: "Cyber Security Professional", detail: "InfoSec" },
];

const TECH_STACK = [
  "Python",
  "React",
  "n8n",
  "Make",
  "Zapier",
  "Ollama",
  "Docker",
  "Flask",
  "Node.js",
  "REST APIs",
  "Workspace ONE",
  "JAMF Pro",
  "Intune",
  "Claude API",
  "PostgreSQL",
  "Git",
];

function useInView(ref, threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return isVisible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isVisible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StatusBadge({ status, color }) {
  const isLive = status === "Live" || status === "Active";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "100px",
        fontSize: "11px",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        background: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {isLive && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
      )}
      {status}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <FadeIn delay={index * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          padding: isFeatured ? "36px" : "28px",
          borderRadius: "16px",
          background: hovered
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? project.color + "40" : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "default",
          gridColumn: isFeatured ? "span 2" : "span 1",
          overflow: "hidden",
          minHeight: isFeatured ? "280px" : "auto",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "20%",
            right: "20%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.color}${hovered ? "80" : "00"}, transparent)`,
            transition: "all 0.4s ease",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <StatusBadge status={project.status} color={project.color} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isFeatured ? "28px" : "22px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "6px",
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: project.color,
            marginBottom: "16px",
            letterSpacing: "0.02em",
          }}
        >
          {project.tagline}
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            marginBottom: "20px",
            maxWidth: isFeatured ? "640px" : "none",
          }}
        >
          {project.description}
        </p>

        {project.metric && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "16px",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            ▸ {project.metric}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: project.github || project.loom ? "20px" : "0",
          }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {(project.github || project.loom || project.live) && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: project.color,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${project.color}30`,
                  transition: "all 0.2s ease",
                }}
              >
                ↗ GitHub
              </a>
            )}
            {project.loom && (
              <a
                href={project.loom}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: project.color,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${project.color}30`,
                }}
              >
                ▶ Demo
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: project.color,
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${project.color}30`,
                }}
              >
                ◉ Live
              </a>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
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
      const data = await res.json();
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

  const nzTime = time.toLocaleTimeString("en-NZ", {
    timeZone: "Pacific/Auckland",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08090E",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          30% { transform: translate(3%, -1%); }
          50% { transform: translate(-1%, 3%); }
          70% { transform: translate(2%, 1%); }
          90% { transform: translate(-3%, 2%); }
        }
        
        @keyframes float-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        ::selection {
          background: rgba(0, 229, 160, 0.3);
          color: #fff;
        }
        
        a { color: inherit; }
        a:hover { opacity: 0.8; }

        @media (max-width: 768px) {
          .hero-title { font-size: 42px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div > div { grid-column: span 1 !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
          .nav-inner { padding: 0 20px !important; }
          .section-pad { padding: 0 20px !important; }
          .hero-section { padding: 0 20px !important; }
          .cert-grid { grid-template-columns: 1fr !important; }
          .tech-wrap { justify-content: center !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
        }
      `}</style>

      {/* Film grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.025,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "grain 0.5s steps(1) infinite",
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 0",
          background:
            scrollY > 50
              ? "rgba(8, 9, 14, 0.85)"
              : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom:
            scrollY > 50
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                fontWeight: 600,
                color: "#00E5A0",
              }}
            >
              AV
            </span>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#00E5A0",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>WLG / NZ</span>
            <span style={{ color: "#00E5A0" }}>{nzTime}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            animation: "float-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              color: "#00E5A0",
              marginBottom: "24px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            AI Workflows & Automation
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: "24px",
              maxWidth: "800px",
            }}
          >
            Ankit
            <br />
            Vaghela
            <span style={{ color: "#00E5A0" }}>.</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "560px",
              marginBottom: "40px",
              fontWeight: 400,
            }}
          >
            I build AI workflows that people can trust and never have to think
            about. From local LLM pipelines to production automation — six
            products shipped, zero hype.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: "10px",
                background: "#00E5A0",
                color: "#08090E",
                textDecoration: "none",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              View Projects ↓
            </a>
            <a
              href="https://github.com/vaankit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: "10px",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s ease",
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: scrollY > 100 ? 0 : 0.3,
            transition: "opacity 0.3s ease",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))",
            }}
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="section-pad"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}
      >
        <FadeIn>
          <div
            className="stats-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "120px",
            }}
          >
            {[
              { value: "6", label: "Products Shipped" },
              { value: "7+", label: "Years in Tech" },
              { value: "4", label: "Certifications" },
              { value: "100%", label: "Local-First AI" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#00E5A0",
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 120px",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: "60px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#00E5A0",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Portfolio
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "42px",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              What I've built
              <span style={{ color: "#00E5A0" }}>.</span>
            </h2>
          </div>
        </FadeIn>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 120px",
        }}
      >
        <FadeIn>
          <div
            style={{
              padding: "60px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, rgba(0,229,160,0.01) 100%)",
              border: "1px solid rgba(0,229,160,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#00E5A0",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "24px",
              }}
            >
              Philosophy
            </span>
            <blockquote
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "28px",
                fontWeight: 500,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.85)",
                maxWidth: "700px",
              }}
            >
              "The user should never have to understand how it works.
              <br />
              They just need to trust the output."
            </blockquote>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                marginTop: "20px",
              }}
            >
              — The bridge principle
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Tech Stack + Certs */}
      <section
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 120px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          <FadeIn>
            <div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#00E5A0",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                Tech Stack
              </span>
              <div
                className="tech-wrap"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#00E5A0",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                Certifications
              </span>
              <div
                className="cert-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {CERTIFICATIONS.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {c.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Background Section */}
      <section
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 120px",
        }}
      >
        <FadeIn>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "#00E5A0",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "24px",
            }}
          >
            Background
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                org: "ANZ Bank",
                role: "Technology Mobility Consultant",
                scope: "7,500+ devices",
              },
              {
                org: "NZ Parliament",
                role: "M365 Migration Lead",
                scope: "120+ MPs & Ministers incl. PMO",
              },
              {
                org: "Ministry of Justice",
                role: "Intune / Autopilot",
                scope: "Endpoint modernisation",
              },
              {
                org: "NZ Police",
                role: "iPhone Refresh",
                scope: "Fleet deployment",
              },
            ].map((b) => (
              <div
                key={b.org}
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "6px",
                  }}
                >
                  {b.org}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "4px",
                  }}
                >
                  {b.role}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  {b.scope}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 120px",
        }}
      >
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "start",
            }}
            className="footer-grid"
          >
            {/* Left — copy */}
            <div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#00E5A0",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Get In Touch
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "42px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                Let's build
                <br />
                something
                <span style={{ color: "#00E5A0" }}>.</span>
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: "380px",
                  marginBottom: "32px",
                }}
              >
                Have an automation idea, a workflow to untangle, or a role that
                needs an AI builder? Drop me a message — it lands straight in my
                inbox.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  { icon: "↗", label: "GitHub", href: "https://github.com/vaankit" },
                  { icon: "↗", label: "LinkedIn", href: "https://linkedin.com/in/ankitvaghela" },
                  { icon: "◉", label: "Wellington, NZ", href: null },
                ].map((link) => (
                  <div key={link.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00E5A0" }}>
                      {link.icon}
                    </span>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.5)",
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                        {link.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div
              style={{
                padding: "36px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "20%",
                  right: "20%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)",
                }}
              />

              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(0,229,160,0.1)",
                      border: "2px solid #00E5A0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "24px",
                    }}
                  >
                    ✓
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    Message sent
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    I'll get back to you shortly.
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical",
                        minHeight: "120px",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "sending" || !formData.name || !formData.email || !formData.message}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "14px 28px",
                      borderRadius: "10px",
                      background:
                        formStatus === "sending"
                          ? "rgba(0,229,160,0.5)"
                          : !formData.name || !formData.email || !formData.message
                            ? "rgba(0,229,160,0.2)"
                            : "#00E5A0",
                      color: "#08090E",
                      border: "none",
                      cursor:
                        formStatus === "sending" || !formData.name || !formData.email || !formData.message
                          ? "not-allowed"
                          : "pointer",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.02em",
                      marginTop: "4px",
                    }}
                  >
                    {formStatus === "sending"
                      ? "Sending..."
                      : formStatus === "error"
                        ? "Failed — try again"
                        : "Send Message →"}
                  </button>

                  {formStatus === "error" && (
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "#FF6B6B",
                        marginTop: "4px",
                      }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer
        className="section-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Let's build something
              <span style={{ color: "#00E5A0" }}>.</span>
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Wellington, New Zealand
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
            }}
          >
            <a
              href="https://github.com/vaankit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ankitvaghela"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:vaankit21@gmail.com"
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              Email
            </a>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.15)",
            marginTop: "40px",
          }}
        >
          © {new Date().getFullYear()} Ankit Vaghela. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
