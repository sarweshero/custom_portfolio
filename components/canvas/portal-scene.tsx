"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MeshDistortMaterial, Sparkles, Ring } from "@react-three/drei"

interface PortalSceneProps {
  scrollProgress: number
  reducedMotion: boolean
}

export default function PortalScene({ scrollProgress, reducedMotion }: PortalSceneProps) {
  const portalRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 3
      positions[i * 3] = Math.cos(theta) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = Math.sin(theta) * radius
    }
    return positions
  }, [])

  useFrame((state) => {
    if (reducedMotion) return

    const time = state.clock.getElapsedTime()

    // Animate portal
    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.1
      portalRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05 + scrollProgress * 0.2)
    }

    // Animate rings
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
      ringsRef.current.rotation.y = time * 0.2
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group position={[0, 0, -2]}>
      {/* Central Portal */}
      <mesh ref={portalRef}>
        <torusGeometry args={[2, 0.3, 32, 100]} />
        <MeshDistortMaterial
          color="#E50914"
          emissive="#E50914"
          emissiveIntensity={0.5 + scrollProgress * 0.5}
          roughness={0.2}
          metalness={0.8}
          distort={reducedMotion ? 0 : 0.3}
          speed={reducedMotion ? 0 : 2}
        />
      </mesh>

      {/* Inner portal glow */}
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[1.7, 64]} />
        <meshBasicMaterial color="#1A001F" transparent opacity={0.9} />
      </mesh>

      {/* Portal energy core */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#E50914" transparent opacity={0.3 + scrollProgress * 0.3} />
      </mesh>

      {/* Animated rings */}
      <group ref={ringsRef}>
        <Ring args={[2.5, 2.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#E50914" transparent opacity={0.5} side={THREE.DoubleSide} />
        </Ring>
        <Ring args={[3, 3.05, 64]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#00B4FF" transparent opacity={0.3} side={THREE.DoubleSide} />
        </Ring>
        <Ring args={[3.5, 3.52, 64]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <meshBasicMaterial color="#6A1B1F" transparent opacity={0.4} side={THREE.DoubleSide} />
        </Ring>
      </group>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={500} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#E50914" transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Sparkles effect */}
      {!reducedMotion && <Sparkles count={100} scale={8} size={2} speed={0.3} color="#E50914" />}
    </group>
  )
}
