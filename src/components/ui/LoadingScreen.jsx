// src/components/ui/LoadingScreen.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("boot");
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const linesRef = useRef([]);

  const BOOT_LINES = [
    "INITIALIZING SYSTEM...",
    "LOADING ASSETS...",
    "CALIBRATING RENDERER...",
    "SYNCING MODEL DATA...",
    "ESTABLISHING CONNECTION...",
  ];

  useEffect(() => {
    const bootTl = gsap.timeline({ onComplete: () => setPhase("loading") });
    linesRef.current.forEach((line, i) => {
      bootTl.fromTo(line, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }, i * 0.18);
    });
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) { current = 100; clearInterval(interval); setTimeout(() => setPhase("done"), 400); }
      setProgress(Math.floor(current));
    }, 120);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    gsap.to(containerRef.current, { opacity: 0, duration: 0.7, delay: 0.2, ease: "power2.inOut", onComplete: () => onComplete?.() });
  }, [phase]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center" style={{ background: "#000000" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 w-full max-w-xs sm:max-w-sm px-6 sm:px-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff, 0 0 20px rgba(0,212,255,0.5)" }} />
            <span className="text-white font-black uppercase tracking-[0.3em]" style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(0.9rem, 4vw, 1.125rem)" }}>RHYTHM</span>
          </div>
          <span className="uppercase tracking-[0.4em]" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.48rem, 1.4vw, 0.55rem)", color: "rgba(0,212,255,0.5)" }}>Portfolio OS v1.0</span>
        </div>

        {/* Boot lines */}
        <div className="w-full flex flex-col gap-1.5 sm:gap-2">
          {BOOT_LINES.map((line, i) => (
            <div key={i} ref={(el) => (linesRef.current[i] = el)} className="flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: phase === "loading" || phase === "done" ? "#00d4ff" : "rgba(0,212,255,0.3)", boxShadow: phase === "loading" || phase === "done" ? "0 0 4px #00d4ff" : "none", transition: "all 0.3s" }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.5rem, 1.4vw, 0.58rem)", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>{line}</span>
              {(phase === "loading" || phase === "done") && (
                <span className="ml-auto" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.48rem, 1.3vw, 0.55rem)", color: "rgba(0,212,255,0.6)" }}>OK</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {(phase === "loading" || phase === "done") && (
          <div className="w-full flex flex-col gap-3">
            <div className="w-full h-px relative overflow-visible" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div ref={progressBarRef} className="absolute top-0 left-0 h-px transition-all duration-100" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.4))", boxShadow: "0 0 8px rgba(0,212,255,0.6)" }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-100" style={{ left: `${progress}%`, transform: "translate(-50%, -50%)", background: "#00d4ff", boxShadow: "0 0 6px #00d4ff" }} />
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.48rem, 1.3vw, 0.55rem)", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)" }}>{phase === "done" ? "SYSTEM READY" : "LOADING"}</span>
              <span ref={counterRef} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)", fontWeight: 700, color: "#00d4ff" }}>{progress}%</span>
            </div>
          </div>
        )}

        {/* Corner decorations */}
        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-4 sm:w-5 h-4 sm:h-5" style={{ borderTop: "1px solid rgba(0,212,255,0.3)", borderLeft: "1px solid rgba(0,212,255,0.3)" }} />
        <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-4 sm:w-5 h-4 sm:h-5" style={{ borderTop: "1px solid rgba(0,212,255,0.3)", borderRight: "1px solid rgba(0,212,255,0.3)" }} />
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-4 sm:w-5 h-4 sm:h-5" style={{ borderBottom: "1px solid rgba(0,212,255,0.3)", borderLeft: "1px solid rgba(0,212,255,0.3)" }} />
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-4 sm:w-5 h-4 sm:h-5" style={{ borderBottom: "1px solid rgba(0,212,255,0.3)", borderRight: "1px solid rgba(0,212,255,0.3)" }} />
      </div>
    </div>
  );
}