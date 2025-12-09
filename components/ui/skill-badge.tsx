"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

interface SkillBadgeProps {
  name: string
  category: string
  delay?: number
}

const categoryColors: Record<string, string> = {
  backend: "#E50914",
  frontend: "#00B4FF",
  ai: "#9B59B6",
  database: "#27AE60",
  devops: "#F39C12",
  cloud: "#3498DB",
  mobile: "#E74C3C",
}

export default function SkillBadge({ name, category, delay = 0 }: SkillBadgeProps) {
  const { reducedMotion } = useReducedMotion()
  const color = categoryColors[category] || "#E50914"

  return (
    <motion.span
      className="px-3 py-1.5 text-sm font-mono rounded-md border transition-all duration-300 cursor-default"
      style={{
        borderColor: `${color}40`,
        color: color,
        backgroundColor: `${color}10`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={
        reducedMotion
          ? {}
          : {
              scale: 1.1,
              boxShadow: `0 0 20px ${color}40`,
              backgroundColor: `${color}20`,
            }
      }
    >
      {name}
    </motion.span>
  )
}
