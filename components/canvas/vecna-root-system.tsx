"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import {
  vecnaRootVertexShader,
  vecnaRootFragmentShader,
  vecnaCoreVertexShader,
  vecnaCoreFragmentShader,
} from "./shaders/vecna-root-shader"

interface RootSystemProps {
  scrollProgress: number
  hoverIntensity: number
  reducedMotion: boolean
}

// Individual root segment component
function RootSegment({
  startPoint,
  endPoint,
  thickness,
  uniforms,
}: {
  startPoint: THREE.Vector3
  endPoint: THREE.Vector3
  thickness: number
  uniforms: Record<string, THREE.IUniform>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      startPoint,
      new THREE.Vector3(
        (startPoint.x + endPoint.x) / 2 + (Math.random() - 0.5) * 0.5,
        (startPoint.y + endPoint.y) / 2 + (Math.random() - 0.5) * 0.5,
        (startPoint.z + endPoint.z) / 2 + (Math.random() - 0.5) * 0.2,
      ),
      endPoint,
    ])
    return new THREE.TubeGeometry(curve, 20, thickness, 8, false)
  }, [startPoint, endPoint, thickness])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vecnaRootVertexShader}
        fragmentShader={vecnaRootFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Vecna Heart Core
function VecnaCore({ uniforms }: { uniforms: Record<string, THREE.IUniform> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 1.0 },
      uDistortion: { value: 0.5 },
    }),
    [],
  )

  useFrame((state) => {
    coreUniforms.uTime.value = state.clock.getElapsedTime()
    coreUniforms.uPulse.value = 0.8 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.2
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <shaderMaterial
        vertexShader={vecnaCoreVertexShader}
        fragmentShader={vecnaCoreFragmentShader}
        uniforms={coreUniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Spore particle system
function SporeParticles({ count = 200, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Spread spores across viewport
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2

      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.01
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }

    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (reducedMotion || !pointsRef.current) return

    const positionAttr = pointsRef.current.geometry.attributes.position
    const posArray = positionAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]

      // Reset particles that float too high
      if (posArray[i * 3 + 1] > 8) {
        posArray[i * 3] = (Math.random() - 0.5) * 20
        posArray[i * 3 + 1] = -8
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2
      }
    }

    positionAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#E50914"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function VecnaRootSystem({ scrollProgress, hoverIntensity, reducedMotion }: RootSystemProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Shared uniforms for all roots
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollFactor: { value: 0 },
      uHoverIntensity: { value: 1.0 },
      uGlowStrength: { value: 1.5 },
      uRootGrowth: { value: 0 },
    }),
    [],
  )

  // Generate root network procedurally
  const roots = useMemo(() => {
    const rootData: Array<{
      start: THREE.Vector3
      end: THREE.Vector3
      thickness: number
    }> = []

    // Left side roots emanating from edges
    for (let i = 0; i < 8; i++) {
      const yStart = -5 + i * 1.2
      rootData.push({
        start: new THREE.Vector3(-viewport.width / 2 - 1, yStart, -1),
        end: new THREE.Vector3(-viewport.width / 4 + Math.random() * 2, yStart + (Math.random() - 0.5) * 2, -0.5),
        thickness: 0.02 + Math.random() * 0.03,
      })
    }

    // Right side roots
    for (let i = 0; i < 8; i++) {
      const yStart = -5 + i * 1.2
      rootData.push({
        start: new THREE.Vector3(viewport.width / 2 + 1, yStart, -1),
        end: new THREE.Vector3(viewport.width / 4 - Math.random() * 2, yStart + (Math.random() - 0.5) * 2, -0.5),
        thickness: 0.02 + Math.random() * 0.03,
      })
    }

    // Bottom roots
    for (let i = 0; i < 6; i++) {
      const xStart = -4 + i * 1.5
      rootData.push({
        start: new THREE.Vector3(xStart, -viewport.height / 2 - 1, -1),
        end: new THREE.Vector3(xStart + (Math.random() - 0.5) * 2, -viewport.height / 4 + Math.random(), -0.5),
        thickness: 0.03 + Math.random() * 0.04,
      })
    }

    // Top roots
    for (let i = 0; i < 6; i++) {
      const xStart = -4 + i * 1.5
      rootData.push({
        start: new THREE.Vector3(xStart, viewport.height / 2 + 1, -1),
        end: new THREE.Vector3(xStart + (Math.random() - 0.5) * 2, viewport.height / 4 - Math.random(), -0.5),
        thickness: 0.02 + Math.random() * 0.03,
      })
    }

    // Central tendrils reaching toward the core
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      rootData.push({
        start: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, -1.5),
        end: new THREE.Vector3(Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, -0.8),
        thickness: 0.015 + Math.random() * 0.02,
      })
    }

    return rootData
  }, [viewport])

  // Animate uniforms
  useFrame((state) => {
    if (reducedMotion) return

    uniforms.uTime.value = state.clock.getElapsedTime()
    uniforms.uScrollFactor.value = scrollProgress
    uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(
      uniforms.uHoverIntensity.value,
      1.0 + hoverIntensity * 0.5,
      0.1,
    )
    uniforms.uRootGrowth.value = THREE.MathUtils.lerp(
      uniforms.uRootGrowth.value,
      Math.min(1, 0.3 + scrollProgress * 1.5),
      0.02,
    )
  })

  // Initial growth animation
  useEffect(() => {
    if (reducedMotion) {
      uniforms.uRootGrowth.value = 1
      return
    }

    let frame: number
    const animate = () => {
      if (uniforms.uRootGrowth.value < 0.3) {
        uniforms.uRootGrowth.value += 0.005
        frame = requestAnimationFrame(animate)
      }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [uniforms, reducedMotion])

  return (
    <group ref={groupRef}>
      {/* Vecna Heart Core - replaces the circular ring */}
      <VecnaCore uniforms={uniforms} />

      {/* Root network */}
      {roots.map((root, i) => (
        <RootSegment
          key={i}
          startPoint={root.start}
          endPoint={root.end}
          thickness={root.thickness}
          uniforms={uniforms}
        />
      ))}

      {/* Floating spores */}
      <SporeParticles count={150} reducedMotion={reducedMotion} />
    </group>
  )
}
