// src/components/sections/HeroSection.jsx
import { motion } from 'framer-motion'

export default function HeroSection() {

  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative z-10 w-full h-screen flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 lg:px-32 overflow-hidden">

      {/* Top HUD bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#00d4ff",
              boxShadow: "0 0 6px #00d4ff, 0 0 12px rgba(0,212,255,0.4)",
              animation: "pulse-dot 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.48rem, 1.5vw, 0.58rem)",
              color: "rgba(0,212,255,0.7)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Available for Deployment
          </span>
        </div>

        <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.6rem" }}>|</span>

        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(0.44rem, 1.4vw, 0.55rem)",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          India / Remote
        </span>
      </motion.div>

      {/* Role label */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="flex items-center gap-3 mb-3 sm:mb-4"
      >
        <div
          className="h-px w-6 sm:w-8"
          style={{
            background: "linear-gradient(90deg, #00d4ff, transparent)",
            boxShadow: "0 0 6px rgba(0,212,255,0.4)",
          }}
        />
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(0.55rem, 1.8vw, 0.68rem)",
            color: "rgba(0,212,255,0.8)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Full Stack Developer
        </span>
      </motion.div>

      {/* Main name */}
      <motion.h1
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(3rem, 14vw, 9rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.95)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
        }}
      >
        RHYTHM
      </motion.h1>

      {/* Last name */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6"
      >
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(0.9rem, 4vw, 2.8rem)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          SINGH
        </span>
        <div
          className="h-px flex-1 max-w-[80px] sm:max-w-[120px]"
          style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.3), transparent)" }}
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="max-w-xs sm:max-w-md mb-3"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.8,
        }}
      >
        Building immersive web experiences with{' '}
        <span style={{ color: "#00d4ff" }}>React</span>,{' '}
        <span style={{ color: "#00d4ff" }}>Three.js</span> &{' '}
        <span style={{ color: "#00d4ff" }}>Node.js</span>
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10"
      >
        {[
          { value: "8.62", label: "CGPA" },
          { value: "5+", label: "Projects" },
          { value: "1", label: "Internship" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.42rem, 1.2vw, 0.5rem)",
                color: "rgba(0,212,255,0.5)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-center gap-3 sm:gap-4 flex-wrap"
      >
        <button
          onClick={() => handleScroll('#projects')}
          className="relative overflow-hidden group flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 transition-all duration-300"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            border: "1px solid rgba(0,212,255,0.5)",
            color: "#00d4ff",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.2)" }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none" }}
        >
          <span className="relative z-10">View Deployments</span>
          <svg className="relative z-10" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,212,255,0.07)" }}
          />
        </button>

        <button
          onClick={() => handleScroll('#contact')}
          className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 transition-all duration-300"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.75)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.35)"
            e.currentTarget.style.borderColor = "transparent"
          }}
        >
          Initiate Contact
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Bottom HUD row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 md:left-20 lg:left-32 flex items-center gap-4 sm:gap-6"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-px h-8 sm:h-10"
            style={{
              background: "linear-gradient(to bottom, #00d4ff, transparent)",
              boxShadow: "0 0 4px rgba(0,212,255,0.4)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.52rem, 1.5vw, 0.65rem)",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </div>

        <div
          className="hidden md:flex items-center gap-2"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: "24px" }}
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            B.Tech CSE · Jain University · 2025
          </span>
        </div>
      </motion.div>

      {/* Top right HUD coordinates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute top-20 sm:top-24 right-5 sm:right-8 md:right-16 flex flex-col items-end gap-1 pointer-events-none"
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(0.4rem, 1.2vw, 0.5rem)",
            color: "rgba(0,212,255,0.2)",
            letterSpacing: "0.15em",
          }}
        >
          SYS // PORTFOLIO_OS
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(0.4rem, 1.2vw, 0.5rem)",
            color: "rgba(255,255,255,0.1)",
            letterSpacing: "0.15em",
          }}
        >
          VER 1.0.0 · 2026
        </span>
      </motion.div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00d4ff, 0 0 12px rgba(0,212,255,0.4); }
          50% { opacity: 0.3; box-shadow: 0 0 2px #00d4ff; }
        }
        @keyframes scroll-line {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.7); }
        }
      `}</style>

    </section>
  )
}