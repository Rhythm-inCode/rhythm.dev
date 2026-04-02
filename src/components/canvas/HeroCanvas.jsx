// src/components/canvas/HeroCanvas.jsx
import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleField from './ParticleField'
import MechModel from './MechModel'

export default function HeroCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 10 : 8], fov: isMobile ? 60 : 50 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[2, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[0, 2, 3]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[0, 0, -4]} intensity={1} color="#00fff7" />
        <pointLight position={[0, 0.5, 1]} intensity={2} color="#00d4ff" distance={6} />

        <MechModel mouse={mouse} isMobile={isMobile} />
        <ParticleField mouse={mouse} />

        <EffectComposer>
          <Bloom
            intensity={0.13}
            luminanceThreshold={1.5}
            luminanceSmoothing={0.9}
            height={isMobile ? 150 : 300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}