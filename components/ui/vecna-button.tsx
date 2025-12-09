"use client"

import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface VecnaButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  glowIntensity?: "low" | "medium" | "high"
}

const VecnaButton = forwardRef<HTMLButtonElement, VecnaButtonProps>(
  ({ className, variant = "primary", size = "md", glowIntensity = "medium", children, ...props }, ref) => {
    const glowStrength = {
      low: "hover:shadow-[0_0_15px_rgba(229,9,20,0.3)]",
      medium: "hover:shadow-[0_0_25px_rgba(229,9,20,0.5),0_0_50px_rgba(229,9,20,0.2)]",
      high: "hover:shadow-[0_0_40px_rgba(229,9,20,0.7),0_0_80px_rgba(229,9,20,0.4)]",
    }

    const variants = {
      primary:
        "bg-gradient-to-br from-[#2a0a15] to-[#0a0305] border-[#E50914]/40 text-[#DADADA] hover:border-[#E50914]",
      secondary:
        "bg-gradient-to-br from-[#1a0510] to-[#050208] border-[#3a0a20] text-[#888] hover:text-[#DADADA] hover:border-[#E50914]/50",
      ghost: "bg-transparent border-transparent text-[#888] hover:text-[#E50914] hover:bg-[#1a0510]/50",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative overflow-hidden rounded-lg border font-mono tracking-wider transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#E50914]/10 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100",
          "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.2)_0%,transparent_70%)] after:opacity-0 after:transition-opacity hover:after:opacity-100",
          variants[variant],
          sizes[size],
          glowStrength[glowIntensity],
          className,
        )}
        {...props}
      >
        {/* Pulsing vein effect on hover */}
        <motion.span
          className="absolute inset-0 opacity-0"
          whileHover={{
            opacity: [0, 0.3, 0],
            transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(229,9,20,0.3) 50%, transparent 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  },
)

VecnaButton.displayName = "VecnaButton"

export { VecnaButton }
