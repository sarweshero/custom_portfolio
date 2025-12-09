"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0) // 0: static, 1: claw hit, 2: cracks, 3: portal open, 4: title reveal
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  // Stage progression based on time
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400), // Claw hit at 0.4s
      setTimeout(() => setStage(2), 800), // Cracks at 0.8s
      setTimeout(() => setStage(3), 1400), // Portal opens at 1.4s
      setTimeout(() => setStage(4), 2200), // Title reveal at 2.2s
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // CRT Static noise canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = stage < 3 ? 40 : 15 // More visible during early stages
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const animateNoise = () => {
      drawNoise()
      requestAnimationFrame(animateNoise)
    }

    animateNoise()
  }, [stage])

  const titleLetters = "SARWESHERO".split("")

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* CRT Static Canvas */}
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />

      {/* CRT Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Bulb Flicker Effect - Stage 0 */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            className="absolute inset-0 bg-[#E50914]/5"
            animate={{ opacity: [0, 0.1, 0, 0.15, 0, 0.05, 0] }}
            transition={{ duration: 0.4, repeat: 2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Claw Impact Effect - Stage 1 */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="absolute z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 0.4 }}
          >
            {/* Claw Silhouette */}
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: [0, 1.2, 0.8], rotate: [-45, 0, 15], opacity: [1, 1, 0] }}
              transition={{ duration: 0.5 }}
            >
              <path
                d="M100 40 L80 100 L60 80 L70 120 L50 110 L65 140 L100 180 L135 140 L150 110 L130 120 L140 80 L120 100 L100 40"
                fill="none"
                stroke="#E50914"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>

            {/* Impact Sparks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#E50914] rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 100,
                  y: Math.sin((i / 12) * Math.PI * 2) * 100,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.6, delay: i * 0.02 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal Cracks - Stage 2+ */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div className="absolute z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Lightning cracks spreading from center */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.path
                  key={i}
                  d={generateCrackPath(angle)}
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="2"
                  filter="url(#crack-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.5, 1, 0.8] }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              ))}
              {/* Blue core glow at center */}
              <motion.circle
                cx="200"
                cy="200"
                r="30"
                fill="none"
                stroke="#00B4FF"
                strokeWidth="4"
                filter="url(#blue-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
                transition={{ duration: 0.4, delay: 0.3 }}
              />
              <defs>
                <filter id="crack-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="blue-glow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal Opening - Stage 3+ */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div className="absolute z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Portal tear - vertical rip */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              initial={{ width: 0, height: 0 }}
              animate={{
                width: [0, 60, 200 + progress * 1.5],
                height: [0, 300, 400 + progress * 0.5],
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Inside the portal - Upside Down void */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, #1A001F 0%, #0A0A0A 50%, #000 100%)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
              >
                {/* Volumetric fog inside portal */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(229,9,20,0.2) 0%, transparent 70%)",
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Floating spores */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#E50914]/60 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      x: [Math.random() * 10 - 5, Math.random() * 10 - 5],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Portal edges - burnt glowing effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg
                width="500"
                height="500"
                viewBox="0 0 500 500"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.ellipse
                  cx="250"
                  cy="250"
                  rx={30 + progress * 0.8}
                  ry={80 + progress * 0.3}
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="6"
                  filter="url(#portal-edge)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <defs>
                  <filter id="portal-edge">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </motion.div>

            {/* Red lightning flickers */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-transparent via-[#E50914] to-transparent"
                style={{
                  height: 100 + Math.random() * 100,
                  transform: `translate(-50%, -50%) rotate(${i * 60 + Math.random() * 30}deg)`,
                  transformOrigin: "center",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5 + Math.random(),
                  delay: Math.random(),
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Reveal - Stage 4 */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            className="absolute z-50 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Main Title */}
            <div className="flex justify-center flex-wrap mb-4">
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#E50914] inline-block"
                  style={{
                    fontFamily: "Georgia, serif", // Benguiat-like serif
                    textShadow: "0 0 10px rgba(229,9,20,0.8), 0 0 20px rgba(229,9,20,0.5), 0 0 40px rgba(229,9,20,0.3)",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.5, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(229,9,20,0.8), 0 0 20px rgba(229,9,20,0.5)",
                        "0 0 20px rgba(229,9,20,1), 0 0 40px rgba(229,9,20,0.8)",
                        "0 0 10px rgba(229,9,20,0.8), 0 0 20px rgba(229,9,20,0.5)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </div>

            {/* Chromatic Aberration Effect */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ mixBlendMode: "screen" }}
              animate={{
                x: [-2, 2, -2],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 0.15, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              <div className="flex">
                {titleLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#00B4FF]/50"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-sm sm:text-base text-[#888888] font-mono tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
              transition={{
                opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                y: { delay: 0.6, duration: 0.5 },
              }}
            >
              ENTERING THE UPSIDE DOWN...
            </motion.p>

            {/* Loading Progress Bar */}
            <motion.div
              className="mt-8 w-48 h-1 bg-[#1A001F] rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#E50914] via-[#00B4FF] to-[#E50914]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.p
              className="mt-2 text-xs text-[#E50914] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen dent effect during claw hit */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            className="absolute inset-0 z-[60] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* VHS tracking lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-[70]"
        animate={{ y: ["-100%", "100vh"] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.div>
  )
}

// Helper function to generate jagged crack paths
function generateCrackPath(angle: number): string {
  const cx = 200
  const cy = 200
  const length = 120
  const radian = (angle * Math.PI) / 180

  let path = `M ${cx} ${cy}`
  let x = cx
  let y = cy

  const segments = 5
  for (let i = 0; i < segments; i++) {
    const segLength = length / segments
    const jitterAngle = radian + (Math.random() - 0.5) * 0.5
    x += Math.cos(jitterAngle) * segLength
    y += Math.sin(jitterAngle) * segLength
    path += ` L ${x} ${y}`
  }

  return path
}
