"use client"

import { motion } from "framer-motion"

interface FogOverlayProps {
  intensity: number
}

export default function FogOverlay({ intensity }: FogOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {/* Top fog layer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(to bottom, rgba(10, 10, 10, ${0.8 + intensity * 0.2}), transparent)`,
        }}
      />

      {/* Bottom fog layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(to top, rgba(10, 10, 10, ${0.9 + intensity * 0.1}), transparent)`,
        }}
      />

      {/* Side fog */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/4"
        style={{
          background: `linear-gradient(to right, rgba(26, 0, 31, ${0.4 + intensity * 0.3}), transparent)`,
        }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/4"
        style={{
          background: `linear-gradient(to left, rgba(26, 0, 31, ${0.4 + intensity * 0.3}), transparent)`,
        }}
      />

      {/* Animated fog particles */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(229, 9, 20, 0.1) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 70%, rgba(0, 180, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(ellipse at 50% 50%, rgba(106, 27, 31, 0.15) 0%, transparent 60%)`,
        }}
      />
    </div>
  )
}
