import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (lenisRef) => {
  useEffect(() => {
    // Lenis + ScrollTrigger sync
    if (!lenisRef?.current) return

    lenisRef.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.ticker.remove(ScrollTrigger.update)
    }
  }, [lenisRef])
}