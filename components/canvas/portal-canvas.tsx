"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { Environment, Stars } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing"
import VecnaRootSystem from "./vecna-root-system"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"
import { BlendFunction, KernelSize } from "postprocessing"

interface PortalCanvasProps {
  scrollProgress: number
}

export default function PortalCanvas({ scrollProgress }: PortalCanvasProps) {
  const { reducedMotion } = useReducedMotion()
  const [hoverIntensity, setHoverIntensity] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false)

  // Track mouse for hover reactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })

      // Calculate distance from center for hover intensity
      const distance = Math.sqrt(x * x + y * y)
      setHoverIntensity(Math.max(0, 1 - distance))
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const connection = (navigator as any)?.connection
    const saveData = Boolean(connection?.saveData)
    const highDpr = typeof window !== "undefined" ? window.devicePixelRatio > 1.6 : false
    const narrowViewport = typeof window !== "undefined" ? window.innerWidth < 1024 : false
    setIsLowPowerDevice(saveData || highDpr || narrowViewport)
  }, [])

  if (reducedMotion || isLowPowerDevice) {
    return <div className="fixed inset-0 z-0 bg-[#050208]" />
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[0.7, 1.1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050208"]} />

          {/* Ambient lighting - dimmer for darker aesthetic */}
          <ambientLight intensity={0.08} />
          <pointLight position={[0, 0, 2]} intensity={1.8} color="#E50914" distance={10} decay={2} />
          <pointLight position={[-5, 5, 3]} intensity={0.2} color="#3A0A20" />
          <pointLight position={[5, -5, 3]} intensity={0.2} color="#1A0A30" />

          {/* Stars background - darker, more ominous */}
          <Stars radius={90} depth={40} count={800} factor={2.2} saturation={0} fade speed={0.12} />

          <VecnaRootSystem
            scrollProgress={scrollProgress}
            hoverIntensity={hoverIntensity}
            reducedMotion={reducedMotion}
          />

          {/* Environment - night preset for dark mood */}
          <Environment preset="night" />

          <fog attach="fog" args={["#050208", 3, 15]} />

          <EffectComposer>
            <Bloom intensity={0.9} luminanceThreshold={0.28} luminanceSmoothing={0.7} kernelSize={KernelSize.MEDIUM} />
            <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0012, 0.0012]} />
            <Vignette darkness={0.6} offset={0.32} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
