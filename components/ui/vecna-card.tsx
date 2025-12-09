"use client"

import type React from "react"

import { forwardRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface VecnaCardProps {
  children: ReactNode
  className?: string
  delay?: number
  enableHover?: boolean
}

const VecnaCard = forwardRef<HTMLDivElement, VecnaCardProps>(
  ({ children, className, delay = 0, enableHover = true }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const cardRef = ref || internalRef
    const isInView = useInView(cardRef as React.RefObject<HTMLDivElement>, { once: true, margin: "-100px" })

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={
          enableHover
            ? {
                y: -5,
                boxShadow: "0 20px 60px rgba(229,9,20,0.15), 0 0 40px rgba(229,9,20,0.1)",
                borderColor: "rgba(229,9,20,0.4)",
              }
            : {}
        }
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-gradient-to-b from-[#0a0510]/90 to-[#050208]/95",
          "border border-[#E50914]/15",
          "backdrop-blur-xl",
          "transition-colors duration-300",
          className,
        )}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E50914]/50 to-transparent" />

        {/* Corner vein accents */}
        <svg className="absolute top-0 left-0 w-16 h-16 opacity-30" viewBox="0 0 64 64">
          <motion.path
            d="M0,0 Q20,10 30,30 Q35,45 32,64"
            fill="none"
            stroke="#E50914"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        </svg>
        <svg className="absolute top-0 right-0 w-16 h-16 opacity-30 rotate-90" viewBox="0 0 64 64">
          <motion.path
            d="M0,0 Q20,10 30,30 Q35,45 32,64"
            fill="none"
            stroke="#E50914"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: delay + 0.4 }}
          />
        </svg>

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  },
)

VecnaCard.displayName = "VecnaCard"

export { VecnaCard }
