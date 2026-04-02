// src/components/sections/SkillsSection.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    code: "01",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML & CSS", level: 95 },
      { name: "ShadCN UI", level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    code: "02",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    id: "tools",
    label: "Tools & AI",
    code: "03",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Prompt Engineering", level: 85 },
      { name: "GitHub Copilot", level: 80 },
      { name: "ChatGPT", level: 90 },
    ],
  },
  {
    id: "core",
    label: "Core",
    code: "04",
    skills: [
      { name: "Java", level: 75 },
      { name: "DSA", level: 72 },
      { name: "Problem Solving", level: 82 },
      { name: "Time Complexity", level: 74 },
    ],
  },
];

function SkillRow({ skill, isActive, barDelay }) {
  const barRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!isActive || triggered.current) return;
    triggered.current = true;
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: `${skill.level}%`, duration: 1.1, delay: barDelay, ease: "power3.out" }
    );
  }, [isActive]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span
          className="uppercase tracking-widest font-medium"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(0.58rem, 1.5vw, 0.7rem)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.14em",
          }}
        >
          {skill.name}
        </span>
        <span
          className="tabular-nums"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(0.52rem, 1.3vw, 0.6rem)",
            color: "rgba(0,212,255,0.5)",
          }}
        >
          {skill.level}%
        </span>
      </div>

      <div
        className="relative h-px w-full overflow-visible"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-px"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.3))",
            boxShadow: "0 0 6px rgba(0,212,255,0.6)",
          }}
        />
        <div
          ref={barRef}
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: `${skill.level}%`,
            background: "#00d4ff",
            boxShadow: "0 0 6px #00d4ff, 0 0 14px rgba(0,212,255,0.5)",
            opacity: isActive ? 1 : 0,
            transition: `opacity 0.3s ${barDelay + 1.0}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, index }) {
  const cardRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
      {
        opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8, delay: index * 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none",
          onEnter: () => setActive(true),
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col gap-5 sm:gap-6 p-5 sm:p-6 md:p-8 group"
      style={{
        border: "1px solid rgba(0,212,255,0.08)",
        background: "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(0,0,0,0) 60%)",
        transition: "border-color 0.4s, background 0.4s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.22)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,0,0,0) 60%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(0,0,0,0) 60%)";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span
            className="tracking-[0.4em] uppercase"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.46rem, 1.2vw, 0.55rem)",
              color: "rgba(0,212,255,0.4)",
            }}
          >
            MODULE — {category.code}
          </span>
          <h3
            className="font-black uppercase tracking-wider leading-none"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {category.label}
          </h3>
        </div>
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
          <span
            className="absolute top-0 right-0 w-3 h-3"
            style={{
              borderTop: "1px solid rgba(0,212,255,0.4)",
              borderRight: "1px solid rgba(0,212,255,0.4)",
            }}
          />
        </div>
      </div>

      <div className="h-px w-full" style={{ background: "rgba(0,212,255,0.07)" }} />

      <div className="flex flex-col gap-3 sm:gap-4">
        {category.skills.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} isActive={active} barDelay={i * 0.1} />
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 w-3 h-3"
        style={{
          borderBottom: "1px solid rgba(0,212,255,0.25)",
          borderLeft: "1px solid rgba(0,212,255,0.25)",
        }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const headingRef = useRef(null);
  const lineRef = useRef(null);

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
      id="skills"
      className="relative w-full py-24 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 md:w-80 h-48 md:h-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(0,255,247,0.03) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="max-w-6xl mx-auto md:ml-6 lg:ml-24 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="tracking-[0.4em] uppercase"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                color: "rgba(0,212,255,0.5)",
              }}
            >
              03 /
            </span>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(2.5rem, 9vw, 4.5rem)",
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.02em",
              }}
            >
              Arsenal
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
            className="mt-4 sm:mt-5 max-w-xs sm:max-w-sm leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.28)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            }}
          >
            Technologies I've deployed in production — from pixel-perfect UIs to server-side logic.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
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