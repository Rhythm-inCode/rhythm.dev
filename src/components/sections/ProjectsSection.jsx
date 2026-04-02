// src/components/sections/ProjectsSection.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "verdex",
    code: "VX-01",
    title: "Verdex",
    codename: "MARKET ORACLE",
    subtitle: "Product Validation Intelligence Platform",
    description:
      "Engineered a full-stack intelligence platform that eliminates guesswork from dropshipping. Fuses Google Trends + SERP APIs into a real-time demand scoring pipeline. A custom weighted engine outputs GO / TEST / NO-GO verdicts — turning raw market noise into actionable signals.",
    highlights: ["Demand Scoring Engine", "SERP + Trends API Fusion", "GO/TEST/NO-GO Logic", "Responsive Dashboards"],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    tag: "Full Stack",
    github: "https://github.com/Rhythm-inCode/Verdex",
    live: "https://verdex-20.vercel.app",
  },
  {
    id: "subsplit",
    code: "SS-02",
    title: "SubSplit",
    codename: "COST SYNDICATE",
    subtitle: "Subscription Sharing Infrastructure",
    description:
      "Built the backbone for shared subscription management. Users can spin up subscription pools, invite members, and track splits in real time. Engineered with a secure auth layer, dynamic UI state management, and a MongoDB data model that keeps every member's access in sync.",
    highlights: ["Subscription Pool Management", "Real-time Member Sync", "Secure Auth Layer", "Dynamic UI Updates"],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    tag: "Full Stack",
    github: null,
    live: null,
  },
  {
    id: "pokedex",
    code: "PD-03",
    title: "Pokedex-Lite",
    codename: "DATA ATLAS",
    subtitle: "Pokémon Intelligence Explorer",
    description:
      "A data-driven explorer built on public API architecture. Engineered with reusable component logic, search + filter pipelines, and a stat visualization system. Every render is dynamic — no hardcoded entries, pure API-driven rendering at scale.",
    highlights: ["API-driven Rendering", "Search + Filter Pipeline", "Reusable Component System", "Stat Visualization"],
    stack: ["React", "JavaScript", "CSS", "Public APIs"],
    tag: "Frontend",
    github: "https://github.com/Rhythm-inCode/PokeDex",
    live: "https://pokedex-lite11.vercel.app",
  },
  {
    id: "salon",
    code: "SL-04",
    title: "Salon Luxe",
    codename: "LUXURY PROTOCOL",
    subtitle: "Premium Brand Frontend System",
    description:
      "Crafted a premium frontend identity for a luxury salon brand. Focused on motion-first design — smooth entrance animations, service showcases, and an immersive booking interface. Every interaction reinforces the brand's high-end positioning.",
    highlights: ["Motion-first Design", "Service Showcase UI", "Booking Interface", "Premium Brand System"],
    stack: ["HTML", "CSS", "JavaScript"],
    tag: "Frontend",
    github: "https://github.com/Rhythm-inCode/salon-luxe",
    live: "https://salon-luxe.vercel.app",
  },
  {
    id: "resto",
    code: "RD-05",
    title: "Resto Demo",
    codename: "CULINARY INTERFACE",
    subtitle: "Restaurant Experience Frontend",
    description:
      "A fully realized restaurant frontend demo. Designed around ambiance — menu showcasing, visual hierarchy, and smooth transitions that make the dining experience feel tangible through a screen. Clean, fast, and production-ready UI.",
    highlights: ["Ambiance-focused Design", "Menu Showcase System", "Visual Hierarchy", "Smooth Transitions"],
    stack: ["HTML", "CSS", "JavaScript"],
    tag: "Frontend",
    github: "https://github.com/Rhythm-inCode/resto-demo",
    live: "https://resto-demo-brown.vercel.app",
  },
];

// ─── Desktop 3D Ellipse Carousel (unchanged) ──────────────────────────────────

const ELLIPSE_RX = 420;
const ELLIPSE_RY = 70;
const CARD_W = 300;
const TOTAL = PROJECTS.length;

function getEllipsePos(angleRad) {
  return { x: Math.cos(angleRad) * ELLIPSE_RX, y: Math.sin(angleRad) * ELLIPSE_RY };
}
function getScale(y) {
  const norm = (y + ELLIPSE_RY) / (2 * ELLIPSE_RY);
  return 0.72 + norm * 0.42;
}
function getOpacity(y) {
  const norm = (y + ELLIPSE_RY) / (2 * ELLIPSE_RY);
  return 0.28 + norm * 0.72;
}
function getZIndex(y) {
  return Math.round(((y + ELLIPSE_RY) / (2 * ELLIPSE_RY)) * 100);
}

function DesktopCarousel() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const speedRef = useRef(0.004);
  const hoveredRef = useRef(null);
  const expandedRef = useRef(null);

  const [positions, setPositions] = useState(() =>
    PROJECTS.map((_, i) => {
      const angle = (i / TOTAL) * Math.PI * 2;
      const pos = getEllipsePos(angle);
      return { ...pos, scale: getScale(pos.y), opacity: getOpacity(pos.y), z: getZIndex(pos.y) };
    })
  );
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const animate = useCallback(() => {
    if (!hoveredRef.current) angleRef.current += speedRef.current;
    const newPositions = PROJECTS.map((_, i) => {
      const angle = angleRef.current + (i / TOTAL) * Math.PI * 2;
      const pos = getEllipsePos(angle);
      return { ...pos, scale: getScale(pos.y), opacity: getOpacity(pos.y), z: getZIndex(pos.y) };
    });
    setPositions(newPositions);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  useEffect(() => {
    gsap.fromTo(carouselRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 1.2, delay: 0.4, ease: "power2.out",
        scrollTrigger: { trigger: carouselRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
  }, []);

  const handleMouseEnter = (id) => { hoveredRef.current = id; expandedRef.current = id; setHoveredId(id); setExpandedId(id); };
  const handleMouseLeave = () => { hoveredRef.current = null; expandedRef.current = null; setHoveredId(null); setExpandedId(null); };

  return (
    <div
      ref={carouselRef}
      className="relative w-full"
      style={{ height: "520px", perspective: "1000px" }}
    >
      <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -50%)" }}>
        {/* Ellipse orbit line */}
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            width: `${ELLIPSE_RX * 2}px`,
            height: `${ELLIPSE_RY * 2 + 4}px`,
            border: "1px solid rgba(0,212,255,0.07)",
            borderRadius: "50%",
          }}
        />

        {PROJECTS.map((project, i) => {
          const pos = positions[i];
          const isExpanded = expandedId === project.id;
          const isHovered = hoveredId === project.id;

          return (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: isExpanded ? "360px" : `${CARD_W}px`,
                transform: `translate(-50%, -50%) scale(${isExpanded ? 1.08 : pos.scale})`,
                opacity: isExpanded ? 1 : pos.opacity,
                zIndex: isExpanded ? 200 : pos.z,
                transition: isExpanded
                  ? "width 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s"
                  : "width 0.35s ease, transform 0.1s linear, opacity 0.1s linear",
                willChange: "transform, opacity",
                cursor: "pointer",
              }}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative flex flex-col gap-0 overflow-hidden"
                style={{
                  border: isHovered ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(0,212,255,0.1)",
                  background: isExpanded
                    ? "linear-gradient(145deg, rgba(0,12,20,0.97) 0%, rgba(0,5,10,0.97) 100%)"
                    : "linear-gradient(145deg, rgba(0,12,20,0.88) 0%, rgba(0,0,0,0.82) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isHovered
                    ? "0 0 30px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.06), inset 0 0 20px rgba(0,212,255,0.04)"
                    : "none",
                  transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
                }}
              >
                <span className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1px solid rgba(0,212,255,0.5)", borderRight: "1px solid rgba(0,212,255,0.5)" }} />
                <span className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: "1px solid rgba(0,212,255,0.5)", borderLeft: "1px solid rgba(0,212,255,0.5)" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(0,212,255,0.07) 0%, transparent 55%)", opacity: isHovered ? 1 : 0, transition: "opacity 0.4s" }} />

                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,212,255,0.5)" }}>{project.code}</span>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.15em", border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.6)", padding: "2px 8px" }}>{project.tag}</span>
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,212,255,0.35)", marginBottom: "4px" }}>◈ {project.codename}</div>
                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: "6px", color: isHovered ? "#ffffff" : "rgba(255,255,255,0.85)", transition: "color 0.3s", letterSpacing: "-0.01em" }}>{project.title}</h3>
                  <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", lineHeight: 1.6, color: "rgba(255,255,255,0.50)", letterSpacing: "0.04em", marginBottom: "12px" }}>{project.subtitle}</p>
                  <div style={{ height: "1px", width: "100%", background: isHovered ? "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.08))" : "rgba(255,255,255,0.05)", boxShadow: isHovered ? "0 0 6px rgba(0,212,255,0.25)" : "none", transition: "all 0.4s", marginBottom: "12px" }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", lineHeight: 1.6, color: "rgba(255,255,255,0.70)", display: "-webkit-box", WebkitLineClamp: isExpanded ? "unset" : 2, WebkitBoxOrient: "vertical", overflow: "hidden", transition: "all 0.4s" }}>{project.description}</p>

                  <div style={{ maxHeight: isExpanded ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div style={{ marginTop: "16px", marginBottom: "12px" }}>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,212,255,0.4)", marginBottom: "8px" }}>▸ Core Systems</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {project.highlights.map((h) => (
                          <div key={h} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>
                            <span style={{ color: "#00d4ff", fontSize: "0.45rem" }}>◆</span>{h}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,212,255,0.4)", marginBottom: "8px" }}>▸ Tech Stack</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {project.stack.map((tech) => (
                          <span key={tech} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid rgba(0,212,255,0.18)", color: "rgba(0,212,255,0.6)", padding: "2px 8px" }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: "#00d4ff" }} onClick={(e) => e.stopPropagation()}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>Deploy
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(255,255,255,0.4)" }} onClick={(e) => e.stopPropagation()}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile Card ───────────────────────────────────────────────────────────────

function MobileProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, delay: index * 0.08, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col overflow-hidden"
      style={{
        border: expanded ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(0,212,255,0.12)",
        background: "linear-gradient(145deg, rgba(0,12,20,0.92) 0%, rgba(0,0,0,0.88) 100%)",
        transition: "border-color 0.3s",
      }}
    >
      {/* Corner brackets */}
      <span className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1px solid rgba(0,212,255,0.5)", borderRight: "1px solid rgba(0,212,255,0.5)" }} />
      <span className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: "1px solid rgba(0,212,255,0.5)", borderLeft: "1px solid rgba(0,212,255,0.5)" }} />

      <div className="p-5">
        {/* Code + tag */}
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,212,255,0.5)" }}>{project.code}</span>
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.15em", border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.6)", padding: "2px 8px" }}>{project.tag}</span>
        </div>

        {/* Codename */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,212,255,0.35)", marginBottom: "4px" }}>◈ {project.codename}</div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.1rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "4px", color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}>{project.title}</h3>

        {/* Subtitle */}
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", lineHeight: 1.6, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", marginBottom: "12px" }}>{project.subtitle}</p>

        {/* Divider */}
        <div style={{ height: "1px", width: "100%", background: "rgba(255,255,255,0.06)", marginBottom: "12px" }} />

        {/* Description */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.7, color: "rgba(255,255,255,0.60)" }}>{project.description}</p>

        {/* Expandable section */}
        <div style={{ maxHeight: expanded ? "400px" : "0px", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
          {/* Highlights */}
          <div style={{ marginTop: "16px", marginBottom: "12px" }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,212,255,0.4)", marginBottom: "8px" }}>▸ Core Systems</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {project.highlights.map((h) => (
                <div key={h} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>
                  <span style={{ color: "#00d4ff", fontSize: "0.45rem" }}>◆</span>{h}
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,212,255,0.4)", marginBottom: "8px" }}>▸ Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.stack.map((tech) => (
                <span key={tech} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid rgba(0,212,255,0.18)", color: "rgba(0,212,255,0.6)", padding: "2px 8px" }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: "#00d4ff" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>Deploy
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>Source
              </a>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="mt-4 flex items-center gap-2 transition-all duration-200"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: expanded ? "#00d4ff" : "rgba(0,212,255,0.45)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {expanded ? "Collapse" : "Access Intel"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 0.9, delay: 0.3, ease: "power3.out", transformOrigin: "left center",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-28 md:py-36 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[900px] h-[300px] md:h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 px-6 sm:px-8 md:px-16">
        {/* Header */}
        <div ref={headingRef} className="mb-8 sm:mb-10 md:mb-6">
          <div className="flex items-baseline gap-4 mb-4">
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,212,255,0.5)" }}>04 /</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2.5rem, 9vw, 4.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>Deployments</h2>
          </div>
          <div
            ref={lineRef}
            className="h-px w-32"
            style={{ background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.08))", boxShadow: "0 0 10px rgba(0,212,255,0.35)" }}
          />
          <p className="mt-4 max-w-xs sm:max-w-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
            Operational systems — {isMobile ? "tap any card to access intel." : "hover any node to access intel."}
          </p>
        </div>
      </div>

      {/* Mobile: vertical card stack */}
      {isMobile ? (
        <div className="px-6 flex flex-col gap-4">
          {PROJECTS.map((project, i) => (
            <MobileProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <DesktopCarousel />
      )}

      {/* Bottom scan line */}
      <div
        className="mt-8 mx-6 md:mx-16 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)" }}
      />
    </section>
  );
}