"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

interface TrailParticle {
  id: number
  x: number
  y: number
  opacity: number
}

export default function VecnaCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<TrailParticle[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Add trail particle
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            opacity: 0.6,
          },
        ].slice(-12) // Keep last 12 particles
        return newTrail
      })
    },
    [cursorX, cursorY],
  )

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  useEffect(() => {
    // Check for interactive elements
    const handleElementHover = () => {
      const hoveredElement = document.querySelector(":hover")
      if (hoveredElement) {
        const isInteractive =
          hoveredElement.tagName === "BUTTON" ||
          hoveredElement.tagName === "A" ||
          hoveredElement.closest("button") ||
          hoveredElement.closest("a") ||
          hoveredElement.closest('[role="button"]') ||
          hoveredElement.closest("input") ||
          hoveredElement.closest("textarea") ||
          hoveredElement.closest("[data-clickable]") ||
          window.getComputedStyle(hoveredElement).cursor === "pointer"
        setIsHovering(!!isInteractive)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleElementHover)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleElementHover)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  // Fade out trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.map((p) => ({ ...p, opacity: p.opacity - 0.08 })).filter((p) => p.opacity > 0))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Hide cursor on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail particles */}
      {trail.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[10001]"
          style={{
            left: particle.x,
            top: particle.y,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0.5, opacity: particle.opacity }}
          animate={{ scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(229, 9, 20, ${particle.opacity}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${4 + index}px rgba(229, 9, 20, ${particle.opacity * 0.5})`,
            }}
          />
        </motion.div>
      ))}

      {/* Outer ring - glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[10002] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className="w-10 h-10 rounded-full animate-vein-pulse"
          style={{
            background: "radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%)",
            border: "1px solid rgba(229, 9, 20, 0.3)",
            boxShadow: isHovering
              ? "0 0 30px rgba(229, 9, 20, 0.5), 0 0 60px rgba(229, 9, 20, 0.3), inset 0 0 20px rgba(229, 9, 20, 0.2)"
              : "0 0 15px rgba(229, 9, 20, 0.3), 0 0 30px rgba(229, 9, 20, 0.15)",
          }}
        />
      </motion.div>

      {/* Inner dot - core cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10003]"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: isHovering
              ? "radial-gradient(circle, #ff4040 0%, #e50914 100%)"
              : "radial-gradient(circle, #e50914 0%, #aa0510 100%)",
            boxShadow: isHovering
              ? "0 0 10px #e50914, 0 0 20px rgba(229, 9, 20, 0.8), 0 0 40px rgba(229, 9, 20, 0.4)"
              : "0 0 6px #e50914, 0 0 12px rgba(229, 9, 20, 0.5)",
          }}
        />
      </motion.div>

      {/* Hover state - tendril effect */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[10001]"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {/* Tendril lines radiating outward */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-[1px] origin-left"
              style={{
                left: "50%",
                top: "50%",
                rotate: `${i * 90 + 45}deg`,
                background: "linear-gradient(90deg, rgba(229, 9, 20, 0.6) 0%, transparent 100%)",
              }}
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[10000]"
          style={{
            left: cursorX.get(),
            top: cursorY.get(),
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{
              border: "2px solid rgba(229, 9, 20, 0.5)",
              boxShadow: "0 0 20px rgba(229, 9, 20, 0.4)",
            }}
          />
        </motion.div>
      )}
    </>
  )
}
