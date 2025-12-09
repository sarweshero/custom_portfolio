"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

interface VineOverlayProps {
  scrollProgress: number
}

// SVG path data for organic Vecna-style roots
const rootPaths = {
  leftEdge: [
    "M-50,100 Q20,150 40,250 Q60,350 30,450 Q0,550 50,650 Q100,750 60,850 Q20,950 80,1080",
    "M-30,50 Q80,120 60,220 Q40,320 100,420 Q160,520 120,620 Q80,720 140,820",
    "M-20,200 Q60,280 40,380 Q20,480 80,580 Q140,680 100,780",
  ],
  rightEdge: [
    "M1970,150 Q1880,220 1900,320 Q1920,420 1860,520 Q1800,620 1850,720 Q1900,820 1840,920",
    "M1950,300 Q1870,380 1890,480 Q1910,580 1850,680 Q1790,780 1840,880",
    "M1940,450 Q1860,520 1880,620 Q1900,720 1840,820",
  ],
  bottom: [
    "M200,1100 Q280,1020 380,1050 Q480,1080 580,1000 Q680,920 780,980",
    "M600,1100 Q680,1000 780,1040 Q880,1080 980,1000",
    "M1000,1100 Q1100,1020 1200,1060 Q1300,1100 1400,1020 Q1500,940 1600,1000",
    "M1400,1100 Q1500,1000 1600,1050 Q1700,1100 1750,1020",
  ],
  top: [
    "M100,-20 Q180,80 280,40 Q380,0 480,100 Q580,200 680,140",
    "M500,-20 Q580,60 680,20 Q780,-20 880,80 Q980,180 1080,120",
    "M1000,-20 Q1100,60 1200,20 Q1300,-20 1400,80",
    "M1500,-20 Q1600,60 1700,20 Q1800,-20 1850,60",
  ],
  central: [
    "M960,540 Q860,480 760,520 Q660,560 560,500 Q460,440 360,500",
    "M960,540 Q1060,480 1160,520 Q1260,560 1360,500 Q1460,440 1560,500",
    "M960,540 Q920,640 880,740 Q840,840 800,940",
    "M960,540 Q1000,640 1040,740 Q1080,840 1120,940",
    "M960,540 Q920,440 880,340 Q840,240 800,140",
    "M960,540 Q1000,440 1040,340 Q1080,240 1120,140",
  ],
}

export default function VineOverlay({ scrollProgress }: VineOverlayProps) {
  const { reducedMotion } = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const controls = useAnimation()
  const [pulseIntensity, setPulseIntensity] = useState(0)

  // Pulsating glow effect
  useEffect(() => {
    if (reducedMotion) return

    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev + 0.05) % (Math.PI * 2))
    }, 50)

    return () => clearInterval(interval)
  }, [reducedMotion])

  if (reducedMotion) return null

  const growthFactor = Math.min(scrollProgress * 2.5 + 0.2, 1)
  const glowIntensity = 0.5 + Math.sin(pulseIntensity) * 0.3

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Vecna root glow filter */}
          <filter id="vecnaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vein pulse glow */}
          <filter id="veinPulse" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={2 + glowIntensity * 3} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for main roots */}
          <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A0510" />
            <stop offset="40%" stopColor="#3A0A20" />
            <stop offset="60%" stopColor="#5A1020" />
            <stop offset="100%" stopColor="#2A0515" />
          </linearGradient>

          {/* Gradient for glowing veins */}
          <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E50914" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FF2020" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0.3" />
          </linearGradient>

          {/* Radial gradient for center fade */}
          <radialGradient id="centerFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#050208" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Background overlay for depth */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#centerFade)" />

        {/* Left edge roots */}
        {rootPaths.leftEdge.map((path, i) => (
          <g key={`left-${i}`}>
            {/* Dark bark layer */}
            <motion.path
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={6 - i}
              strokeLinecap="round"
              filter="url(#vecnaGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: growthFactor, opacity: growthFactor * 0.8 }}
              transition={{ duration: 2 + i * 0.3, ease: "easeOut" }}
            />
            {/* Glowing vein overlay */}
            <motion.path
              d={path}
              fill="none"
              stroke="url(#veinGradient)"
              strokeWidth={2}
              strokeLinecap="round"
              filter="url(#veinPulse)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: growthFactor * 0.9,
                opacity: glowIntensity * growthFactor,
              }}
              transition={{ duration: 2.5 + i * 0.3, ease: "easeOut", delay: 0.3 }}
            />
          </g>
        ))}

        {/* Right edge roots */}
        {rootPaths.rightEdge.map((path, i) => (
          <g key={`right-${i}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={6 - i}
              strokeLinecap="round"
              filter="url(#vecnaGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: growthFactor, opacity: growthFactor * 0.8 }}
              transition={{ duration: 2.2 + i * 0.3, ease: "easeOut", delay: 0.2 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="url(#veinGradient)"
              strokeWidth={2}
              strokeLinecap="round"
              filter="url(#veinPulse)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: growthFactor * 0.9,
                opacity: glowIntensity * growthFactor,
              }}
              transition={{ duration: 2.7 + i * 0.3, ease: "easeOut", delay: 0.5 }}
            />
          </g>
        ))}

        {/* Bottom roots */}
        {rootPaths.bottom.map((path, i) => (
          <g key={`bottom-${i}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              filter="url(#vecnaGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: growthFactor * 0.95, opacity: growthFactor * 0.7 }}
              transition={{ duration: 1.8 + i * 0.2, ease: "easeOut", delay: 0.4 + i * 0.1 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="#E50914"
              strokeWidth={1.5}
              strokeLinecap="round"
              filter="url(#veinPulse)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: growthFactor * 0.85,
                opacity: glowIntensity * growthFactor * 0.8,
              }}
              transition={{ duration: 2.3 + i * 0.2, ease: "easeOut", delay: 0.6 + i * 0.1 }}
            />
          </g>
        ))}

        {/* Top roots */}
        {rootPaths.top.map((path, i) => (
          <g key={`top-${i}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={4}
              strokeLinecap="round"
              filter="url(#vecnaGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: growthFactor * 0.9, opacity: growthFactor * 0.6 }}
              transition={{ duration: 2 + i * 0.2, ease: "easeOut", delay: 0.3 + i * 0.1 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="url(#veinGradient)"
              strokeWidth={1.5}
              strokeLinecap="round"
              filter="url(#veinPulse)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: growthFactor * 0.8,
                opacity: glowIntensity * growthFactor * 0.7,
              }}
              transition={{ duration: 2.5 + i * 0.2, ease: "easeOut", delay: 0.5 + i * 0.1 }}
            />
          </g>
        ))}

        {/* Central tendrils reaching toward center */}
        {rootPaths.central.map((path, i) => (
          <g key={`central-${i}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={3}
              strokeLinecap="round"
              filter="url(#vecnaGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: growthFactor, opacity: growthFactor * 0.5 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.8 + i * 0.15 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="#E50914"
              strokeWidth={1}
              strokeLinecap="round"
              filter="url(#veinPulse)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: growthFactor * 0.95,
                opacity: glowIntensity * growthFactor * 0.9,
              }}
              transition={{ duration: 3, ease: "easeOut", delay: 1 + i * 0.15 }}
            />
          </g>
        ))}

        {/* Animated spore particles */}
        {Array.from({ length: 40 }).map((_, i) => {
          const startX = Math.random() * 1920
          const startY = Math.random() * 1080
          return (
            <motion.circle
              key={`spore-${i}`}
              cx={startX}
              cy={startY}
              r={1 + Math.random() * 2}
              fill="#E50914"
              filter="url(#veinPulse)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, growthFactor * 0.6 * glowIntensity, 0],
                scale: [0, 1, 0.5],
                y: [0, -80 - Math.random() * 80],
                x: [(Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
