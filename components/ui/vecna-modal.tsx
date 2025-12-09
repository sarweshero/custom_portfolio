"use client"

import { type ReactNode, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface VecnaModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

export function VecnaModal({ isOpen, onClose, children, title, className }: VecnaModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with root tendrils effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#050208]/90 backdrop-blur-sm"
          >
            {/* Animated vein backdrop */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <motion.path
                d="M0,50% Q25%,30% 50%,50% Q75%,70% 100%,50%"
                fill="none"
                stroke="#E50914"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </motion.div>

          {/* Modal with tear-through animation */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={cn(
              "fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2",
              "w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto",
              "rounded-xl",
              "bg-gradient-to-b from-[#0a0510] to-[#050208]",
              "border border-[#E50914]/30",
              "shadow-[0_0_60px_rgba(229,9,20,0.3),0_0_120px_rgba(229,9,20,0.1),inset_0_0_60px_rgba(0,0,0,0.5)]",
              className,
            )}
          >
            {/* Glowing top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E50914] to-transparent" />

            {/* Corner root decorations */}
            <svg className="absolute top-0 left-0 w-24 h-24 opacity-40" viewBox="0 0 96 96">
              <motion.path
                d="M0,0 Q30,15 40,40 Q45,60 30,96"
                fill="none"
                stroke="#E50914"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.path
                d="M0,20 Q20,35 25,55"
                fill="none"
                stroke="#3a0a20"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </svg>
            <svg className="absolute top-0 right-0 w-24 h-24 opacity-40 scale-x-[-1]" viewBox="0 0 96 96">
              <motion.path
                d="M0,0 Q30,15 40,40 Q45,60 30,96"
                fill="none"
                stroke="#E50914"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              />
            </svg>

            {/* Header */}
            {title && (
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[#2a0a15] bg-[#050208]/80 backdrop-blur-sm">
                <h2 className="text-xl font-serif text-[#E50914]" style={{ textShadow: "0 0 20px rgba(229,9,20,0.5)" }}>
                  {title}
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-[#888] hover:text-[#E50914] transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#E50914]/5 to-transparent pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
