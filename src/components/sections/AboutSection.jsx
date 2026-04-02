// src/components/sections/AboutSection.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const tagsRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(labelRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(headingRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left center',
          scrollTrigger: { trigger: lineRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 83%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.about-stat',
        { opacity: 0, y: 30, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo(tagsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 87%', toggleActions: 'play none none reverse' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center py-24 sm:py-32 px-6 sm:px-10 md:px-0"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 w-60 md:w-80 h-60 md:h-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content — right side on desktop, full width on mobile */}
      <div className="relative z-10 w-full md:ml-auto md:mr-8 lg:mr-16 xl:mr-24 md:max-w-[460px] flex flex-col gap-5 sm:gap-6">

        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-3">
          <div
            className="h-px w-6"
            style={{
              background: "linear-gradient(90deg, transparent, #00d4ff)",
              boxShadow: "0 0 6px rgba(0,212,255,0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(0.5rem, 1.5vw, 0.58rem)",
              color: "rgba(0,212,255,0.6)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            02 / Operator Profile
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Available to Build.
          <br />
          <span style={{ color: "#00d4ff" }}>Ready to Ship.</span>
        </h2>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="h-px w-16"
          style={{
            background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.08))",
            boxShadow: "0 0 8px rgba(0,212,255,0.35)",
          }}
        />

        {/* Bio */}
        <div ref={textRef} className="flex flex-col gap-3 sm:gap-4">
          {[
            <>B.Tech CSE at{' '}<span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Jain University</span>{' '}— obsessed with clean architecture, immersive UI, and systems that hold up under pressure. I care about the details most developers skip.</>,
            <>Interned at{' '}<span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Pragati Infocom Pvt. Ltd.</span>{' '}as a Frontend Developer — shipped responsive UI modules, integrated APIs, and used GenAI tools to move faster without cutting corners.</>,
            <>Current focus —{' '}<span style={{ color: "rgba(0,212,255,0.85)" }}>3D web experiences</span>,{' '}<span style={{ color: "rgba(0,212,255,0.85)" }}>full-stack architecture</span>, and{' '}<span style={{ color: "rgba(0,212,255,0.85)" }}>DSA</span>. Building things that make people stop and look twice.</>,
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.78rem, 2vw, 0.85rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.85,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-3 mt-1">
          {[
            { value: 'Jain Univ', label: 'Institution', sub: 'B.Tech CSE' },
            { value: 'Remote', label: 'Internship', sub: 'Pragati Infocom' },
            { value: '2026', label: 'Graduating', sub: 'Expected' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="about-stat flex flex-col gap-1 p-3 sm:p-4 group transition-all duration-300"
              style={{
                border: "1px solid rgba(0,212,255,0.08)",
                background: "rgba(0,212,255,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)"
                e.currentTarget.style.background = "rgba(0,212,255,0.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)"
                e.currentTarget.style.background = "rgba(0,212,255,0.02)"
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
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
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "clamp(0.4rem, 1.1vw, 0.48rem)",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
          {['React', 'Node.js', 'MongoDB', 'Three.js', 'Tailwind', 'Express', 'GSAP', 'R3F', 'Framer Motion'].map(tag => (
            <span
              key={tag}
              className="transition-all duration-200 cursor-default"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(0.5rem, 1.4vw, 0.58rem)",
                padding: "4px 8px",
                border: "1px solid rgba(0,212,255,0.15)",
                color: "rgba(0,212,255,0.55)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"
                e.currentTarget.style.color = "#00d4ff"
                e.currentTarget.style.background = "rgba(0,212,255,0.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"
                e.currentTarget.style.color = "rgba(0,212,255,0.55)"
                e.currentTarget.style.background = "transparent"
              }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}