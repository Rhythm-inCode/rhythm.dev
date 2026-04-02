// src/components/sections/TimelineSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    id: "jain",
    type: "EDUCATION",
    period: "2022 — 2026",
    title: "B.Tech Computer Science",
    org: "Jain University",
    location: "Bangalore, India",
    detail: "8.62 CGPA",
    tags: ["React", "Node.js", "DSA", "MongoDB", "Java"],
    accent: "#00d4ff",
    status: "ACTIVE",
  },
  {
    id: "pragati",
    type: "EXPERIENCE",
    period: "Jun — Jul 2024",
    title: "Frontend Developer Intern",
    org: "Pragati Infocom Pvt. Ltd.",
    location: "Remote",
    detail: "Shipped responsive UI modules, integrated APIs, leveraged GenAI tools to accelerate delivery.",
    tags: ["HTML", "CSS", "JS", "Tailwind", "API Integration"],
    accent: "#00fff7",
    status: "COMPLETED",
  },
  {
    id: "xii",
    type: "EDUCATION",
    period: "2022",
    title: "Class XII — Science",
    org: "DAV Public School",
    location: "Patna, India",
    detail: "88%",
    tags: ["Physics", "Chemistry", "Mathematics", "CS"],
    accent: "#00d4ff",
    status: "COMPLETED",
  },
  {
    id: "x",
    type: "EDUCATION",
    period: "2020",
    title: "Class X",
    org: "DAV Public School",
    location: "Patna, India",
    detail: "90%",
    tags: ["Science", "Mathematics", "English"],
    accent: "#00d4ff",
    status: "COMPLETED",
  },
];

function TimelineCard({ item, index, isLeft }) {
  const cardRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: isLeft ? -50 : 50 },
      {
        opacity: 1, x: 0, duration: 0.8, delay: index * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(
      dotRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.5, delay: index * 0.1 + 0.2, ease: "back.out(2)",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, [index, isLeft]);

  return (
    <div className={`relative flex items-start w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

      {/* Card */}
      <div
        ref={cardRef}
        className={`w-full md:w-[calc(50%-32px)] flex flex-col gap-3 sm:gap-4 p-5 sm:p-6 group transition-all duration-300 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
        style={{
          border: "1px solid rgba(0,212,255,0.08)",
          background: "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(0,0,0,0) 60%)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)";
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,0,0,0) 60%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)";
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(0,0,0,0) 60%)";
        }}
      >
        {/* Corner bracket */}
        <span
          className={`absolute top-0 w-3 h-3 ${isLeft ? "right-0 md:right-0" : "left-0"}`}
          style={{
            borderTop: `1px solid ${item.accent}`,
            [isLeft ? "borderRight" : "borderLeft"]: `1px solid ${item.accent}`,
            opacity: 0.5,
          }}
        />

        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.44rem, 1.3vw, 0.52rem)",
              color: "rgba(0,212,255,0.45)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {item.type}
          </span>
          <span
            className="px-2 py-0.5 text-[0.48rem] font-bold uppercase tracking-widest"
            style={{
              fontFamily: "'Orbitron', monospace",
              border: `1px solid ${item.status === "ACTIVE" ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              color: item.status === "ACTIVE" ? "#00d4ff" : "rgba(255,255,255,0.25)",
            }}
          >
            {item.status}
          </span>
        </div>

        {/* Period */}
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
            color: item.accent,
            letterSpacing: "0.2em",
            opacity: 0.7,
          }}
        >
          {item.period}
        </span>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(0.78rem, 2.2vw, 0.95rem)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
            }}
          >
            {item.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.5rem, 1.4vw, 0.6rem)",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              {item.org}
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.5rem" }}>·</span>
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.46rem, 1.3vw, 0.55rem)",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.1em",
              }}
            >
              {item.location}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "rgba(0,212,255,0.06)" }} />

        {/* Detail */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.7rem, 1.8vw, 0.78rem)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7,
          }}
        >
          {item.detail}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.44rem, 1.2vw, 0.52rem)",
                padding: "2px 6px",
                border: "1px solid rgba(0,212,255,0.12)",
                color: "rgba(0,212,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Center dot — desktop only */}
      <div
        ref={dotRef}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: item.accent,
            boxShadow: `0 0 8px ${item.accent}, 0 0 20px rgba(0,212,255,0.3)`,
          }}
        />
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const lineTrackRef = useRef(null);

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
    gsap.fromTo(lineTrackRef.current,
      { scaleY: 0 },
      {
        scaleY: 1, ease: "none", transformOrigin: "top center",
        scrollTrigger: { trigger: lineTrackRef.current, start: "top 70%", end: "bottom 30%", scrub: 1 },
      }
    );
  }, []);

  return (
    <section
      id="timeline"
      className="relative w-full py-24 sm:py-28 md:py-36 px-6 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                color: "rgba(0,212,255,0.5)",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              03 /
            </span>
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(2rem, 8vw, 4.5rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Logbook
            </h2>
          </div>
          <div
            ref={lineRef}
            className="h-px w-32"
            style={{
              background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.08))",
              boxShadow: "0 0 10px rgba(0,212,255,0.35)",
            }}
          />
          <p
            className="mt-4 sm:mt-5 text-sm max-w-xs sm:max-w-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Education and experience — the path that got me here.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-6 sm:gap-8 md:gap-10">

          {/* Vertical center line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(0,212,255,0.06)" }}
          >
            <div
              ref={lineTrackRef}
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.1))",
                boxShadow: "0 0 6px rgba(0,212,255,0.2)",
              }}
            />
          </div>

          {/* Mobile left accent line */}
          <div
            className="md:hidden absolute left-3 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.05))" }}
          />

          {TIMELINE.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>

        {/* Bottom scan line */}
        <div
          className="mt-16 sm:mt-20 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)" }}
        />
      </div>
    </section>
  );
}