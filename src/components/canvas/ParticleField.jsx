import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ mouse }) {
  const points = useRef()

  const { positions, speeds } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20  // z
      speeds[i] = Math.random() * 0.01 + 0.002
    }

    return { positions, speeds }
  }, [])

  useFrame((state) => {
    if (!points.current) return

    const pos = points.current.geometry.attributes.position.array

    for (let i = 0; i < pos.length; i += 3) {
      // Drift upward slowly
      pos[i + 1] += speeds[i / 3]

      // Reset when out of bounds
      if (pos[i + 1] > 10) {
        pos[i + 1] = -10
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true

    // Mouse reactive subtle shift
    points.current.rotation.y = THREE.MathUtils.lerp(
      points.current.rotation.y,
      mouse.x * 0.05,
      0.02
    )
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      -mouse.y * 0.05,
      0.02
    )
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}