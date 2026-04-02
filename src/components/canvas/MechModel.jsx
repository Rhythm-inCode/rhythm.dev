// src/components/canvas/MechModel.jsx
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MechModel({ mouse, isMobile }) {
  const group = useRef()
  const { scene } = useGLTF('/models/mech.glb')
  const { camera } = useThree()

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) child.material.envMapIntensity = 1.5
    }
  })

  useEffect(() => {
    if (!group.current) return

    if (isMobile) {
      // ── MOBILE: model stays centered, only camera moves ───────────────────
      group.current.position.set(0, -1.5, 1.8)
      group.current.rotation.set(0, 0, 0)

      gsap.timeline({
        scrollTrigger: { trigger: 'body', start: 'top top', end: '30% top', scrub: 1.8 }
      }).to(camera.position, { z: 7, y: 1.5, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#timeline', start: 'top 95%', end: 'top 0%', scrub: 2 }
      }).to(camera.position, { z: 7.5, y: 1.2, ease: 'power1.inOut' })

      gsap.timeline({
        scrollTrigger: { trigger: '#skills', start: 'top 95%', end: 'top 0%', scrub: 1.8 }
      }).to(camera.position, { z: 8, y: 1, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'top 15%', scrub: 1.8 }
      }).to(camera.position, { z: 5.5, y: 1.8, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 20%', scrub: 1.8 }
      }).to(camera.position, { z: 9, y: 1, ease: 'none' })

    } else {
      // ── DESKTOP: original phases untouched ───────────────────────────────

      gsap.timeline({
        scrollTrigger: { trigger: 'body', start: 'top top', end: '30% top', scrub: 1.8 }
      })
        .to(group.current.position, { x: -1, ease: 'none' })
        .to(group.current.rotation, { y: Math.PI * 0.3, ease: 'none' }, '<')

      gsap.timeline({
        scrollTrigger: { trigger: 'body', start: 'top top', end: '30% top', scrub: 1.8 }
      }).to(camera.position, { z: 4, y: 1.8, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#timeline', start: 'top 95%', end: 'top 0%', scrub: 2 }
      })
        .to(group.current.position, { x: 0, ease: 'power1.inOut' })
        .to(group.current.rotation, { y: Math.PI * 0.85, ease: 'power1.inOut' }, '<')

      gsap.timeline({
        scrollTrigger: { trigger: '#timeline', start: 'top 95%', end: 'top 0%', scrub: 2 }
      }).to(camera.position, { z: 5.5, y: 1.2, ease: 'power1.inOut' })

      gsap.timeline({
        scrollTrigger: { trigger: '#skills', start: 'top 95%', end: 'top 0%', scrub: 1.8 }
      })
        .to(group.current.position, { x: 1.4, ease: 'none' })
        .to(group.current.rotation, { y: -Math.PI * 0.3, ease: 'none' }, '<')

      gsap.timeline({
        scrollTrigger: { trigger: '#skills', start: 'top 95%', end: 'top 0%', scrub: 1.8 }
      }).to(camera.position, { z: 6, y: 1, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'top 15%', scrub: 1.8 }
      }).to(group.current.position, { x: 0, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'top 15%', scrub: 1.8 }
      }).to(camera.position, { z: 3.2, y: 2, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 20%', scrub: 1.8 }
      }).to(group.current.position, { x: 0, ease: 'none' })

      gsap.timeline({
        scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 20%', scrub: 1.8 }
      }).to(camera.position, { z: 6.5, y: 1, ease: 'none' })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [camera, isMobile])

  useFrame((state) => {
    if (!group.current) return

    if (!isMobile) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.3,
        0.05
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -mouse.y * 0.1,
        0.05
      )
    }

    group.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <group
      ref={group}
      position={isMobile ? [0, 2, 1.8] : [1.85, 2, 1.8]}
      scale={isMobile ? 0.10 : 0.135}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/mech.glb')