"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
      },
    }),
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgb(229, 9, 20)",
    },
  }

  const title = "SARWESHERO"

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-shadow-black via-dark-purple to-background flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(229, 9, 20, 0.2) 0%, transparent 70%)`,
            transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
          }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgb(229, 9, 20) 25%, rgb(229, 9, 20) 26%, transparent 27%, transparent 74%, rgb(229, 9, 20) 75%, rgb(229, 9, 20) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgb(229, 9, 20) 25%, rgb(229, 9, 20) 26%, transparent 27%, transparent 74%, rgb(229, 9, 20) 75%, rgb(229, 9, 20) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Portal Visual */}
          <motion.div
            className="hidden lg:flex justify-center items-center h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-64 h-64">
              {/* Outer circle glow */}
              <div className="absolute inset-0 rounded-full border-2 border-neon-red opacity-50 animate-pulse" />

              {/* Inner rotating circle */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-electric-blue opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Center glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{
                  background: `radial-gradient(circle, rgb(229, 9, 20) 0%, transparent 70%)`,
                }}
              />

              {/* Center dot */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-neon-red rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: ["0 0 10px rgb(229, 9, 20)", "0 0 20px rgb(229, 9, 20)", "0 0 10px rgb(229, 9, 20)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          {/* Right: Title and CTA */}
          <div className="flex flex-col items-center lg:items-start justify-center space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {title.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl lg:text-7xl font-bold text-neon-red tracking-wider"
                    style={{
                      textShadow: "0 0 20px rgb(229, 9, 20)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle */}
              <motion.div
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                className="text-center lg:text-left"
              >
                <p className="text-lg lg:text-xl text-fog-white font-mono tracking-widest">
                  Full Stack Developer & AI/ML Engineer
                </p>
                <p className="text-sm text-electric-blue font-mono mt-2">
                  Building the future. One line of code at a time.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 w-full lg:w-auto"
            >
              <motion.a
                href="#projects"
                whileHover="hover"
                className="px-8 py-4 bg-neon-red text-white font-mono font-bold rounded-lg border-2 border-neon-red text-center cursor-pointer transition-all hover:bg-transparent hover:text-neon-red"
              >
                Explore Work
              </motion.a>

              <motion.a
                href="/resume.pdf"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border-2 border-neon-red text-neon-red font-mono font-bold rounded-lg hover:bg-neon-red hover:text-white text-center cursor-pointer transition-all"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {[
                { name: "GitHub", href: "https://github.com/sarweshero" },
                { name: "LinkedIn", href: "https://linkedin.com/in/sarweshero" },
                { name: "X", href: "https://x.com/sarweshero" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue hover:text-neon-red transition-colors font-mono text-sm"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgb(229, 9, 20) 2px,
            rgb(229, 9, 20) 4px
          )`,
        }}
      />
    </section>
  )
}
