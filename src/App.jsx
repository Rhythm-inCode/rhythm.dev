// src/App.jsx
import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroCanvas from './components/canvas/HeroCanvas'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import TimelineSection from "./components/sections/TimelineSection"
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import TechStrip from './components/sections/TechStrip'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import LoadingScreen from './components/ui/LoadingScreen'
import ScrollProgress from "./components/ui/ScrollProgress"
import SoundToggle from "./components/ui/SoundToggle"
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const timelineOverlayRef = useRef(null)
  const skillsOverlayRef   = useRef(null)
  const projectsOverlayRef = useRef(null)
  const contactOverlayRef  = useRef(null)

  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 0.4,
      easing: (t) => t * (2 - t),
      smoothWheel: true,
      wheelMultiplier: 2,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ── Timeline overlay ──────────────────────────────────────────────────────
    // Center dark veil — model back is center, content needs to read over it
    gsap.fromTo(timelineOverlayRef.current,
      { opacity: 0 },
      {
        opacity: 1, ease: 'power1.inOut',
        scrollTrigger: { trigger: '#timeline', start: 'top 80%', end: 'top 20%', scrub: 1.5 },
      }
    )
    gsap.to(timelineOverlayRef.current, {
      opacity: 0, ease: 'power1.inOut',
      scrollTrigger: { trigger: '#skills', start: 'top 80%', end: 'top 30%', scrub: 1.5 },
    })

    // ── Skills overlay ────────────────────────────────────────────────────────
    gsap.fromTo(skillsOverlayRef.current,
      { opacity: 0 },
      {
        opacity: 1, ease: 'power1.inOut',
        scrollTrigger: { trigger: '#skills', start: 'top 80%', end: 'top 20%', scrub: 1.5 },
      }
    )
    gsap.to(skillsOverlayRef.current, {
      opacity: 0, ease: 'power1.inOut',
      scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'top 30%', scrub: 1.5 },
    })

    // ── Projects overlay ──────────────────────────────────────────────────────
    gsap.fromTo(projectsOverlayRef.current,
      { opacity: 0 },
      {
        opacity: 1, ease: 'power1.inOut',
        scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'top 20%', scrub: 1.5 },
      }
    )
    gsap.to(projectsOverlayRef.current, {
      opacity: 0, ease: 'power1.inOut',
      scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 30%', scrub: 1.5 },
    })

    // ── Contact overlay ───────────────────────────────────────────────────────
    gsap.fromTo(contactOverlayRef.current,
      { opacity: 0 },
      {
        opacity: 1, ease: 'power1.inOut',
        scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 20%', scrub: 1.5 },
      }
    )

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loaded])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SoundToggle />

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <main
        className="relative w-full bg-dark-bg overflow-x-hidden"
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      >
        <HeroCanvas />

        {/* Timeline overlay — centered veil, model back visible as silhouette */}
        <div
          ref={timelineOverlayRef}
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.82) 100%)',
          }}
        />

        {/* Skills overlay — left heavy */}
        <div
          ref={skillsOverlayRef}
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0,
            background: 'linear-gradient(105deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Projects overlay — top light, bottom heavy */}
        <div
          ref={projectsOverlayRef}
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.70) 100%)',
          }}
        />

        {/* Contact overlay — centered veil */}
        <div
          ref={contactOverlayRef}
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 100%)',
          }}
        />

        <Navbar />

        <div className="relative z-10">
          <HeroSection />

          <div className="w-full h-32 bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />

          <TechStrip />

          <div className="w-full h-24 pointer-events-none" />

          <AboutSection />

          <TimelineSection />

          <SkillsSection />

          <ProjectsSection />

          <ContactSection />
        </div>
      </main>
    </>
  )
}

export default App