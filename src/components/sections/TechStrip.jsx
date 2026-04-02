import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techs = [
  'React', 'Three.js', 'Node.js', 'Express.js', 'MongoDB',
  'Tailwind CSS', 'JavaScript', 'GSAP', 'REST APIs', 'Git',
  'React Three Fiber', 'Framer Motion', 'Java', 'MySQL', 'Vite',
]

export default function TechStrip() {
  const stripRef = useRef(null)
  const track1Ref = useRef(null)
  const track2Ref = useRef(null)

  useEffect(() => {
    // Continuous marquee — track1 left, track2 right
    gsap.to(track1Ref.current, {
      xPercent: -50,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })

    gsap.to(track2Ref.current, {
      xPercent: 50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Fade in on scroll
    gsap.fromTo(stripRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  const renderTechs = (reverse = false) => {
    const items = reverse ? [...techs].reverse() : techs
    // Double for seamless loop
    return [...items, ...items].map((tech, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-2 px-4 py-1.5 mx-3 rounded-full border border-cyan-500/20 text-cyan-400/60 text-xs font-mono uppercase tracking-widest whitespace-nowrap hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-300"
      >
        <span className="w-1 h-1 rounded-full bg-cyan-400/50 inline-block" />
        {tech}
      </span>
    ))
  }

  return (
    <div
      ref={stripRef}
      className="relative w-full py-10 overflow-hidden"
    >
      {/* Top fade line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Left fade mask */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

      {/* Right fade mask */}
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Row 1 — left scroll */}
      <div className="flex mb-3 will-change-transform">
        <div ref={track1Ref} className="flex">
          {renderTechs()}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="flex will-change-transform">
        <div ref={track2Ref} className="flex">
          {renderTechs(true)}
        </div>
      </div>
    </div>
  )
}