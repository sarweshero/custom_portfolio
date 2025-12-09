"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Eye, EyeOff } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [flickerActive, setFlickerActive] = useState(false)
  const { reducedMotion, toggleReducedMotion } = useReducedMotion()
  const flickerTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const triggerFlicker = () => {
    if (reducedMotion) return
    setFlickerActive(true)
    if (flickerTimeoutRef.current) clearTimeout(flickerTimeoutRef.current)
    flickerTimeoutRef.current = setTimeout(() => setFlickerActive(false), 150)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        onMouseEnter={triggerFlicker}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#050208]/95 backdrop-blur-xl border-b border-[#E50914]/30" : ""
        } ${flickerActive ? "opacity-70" : ""}`}
        style={{
          backgroundImage: flickerActive
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(229,9,20,0.03) 2px, rgba(229,9,20,0.03) 4px)"
            : undefined,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#hero")
              }}
              className="text-2xl font-bold text-[#E50914] font-serif cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              style={{
                textShadow: "0 0 20px rgba(229,9,20,0.8), 0 0 40px rgba(229,9,20,0.4)",
                filter: flickerActive ? "brightness(1.5)" : undefined,
              }}
            >
              S{/* Pulsing vein effect behind logo */}
              <motion.span
                className="absolute inset-0 -z-10"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(229,9,20,0.3)",
                    "0 0 40px rgba(229,9,20,0.6)",
                    "0 0 20px rgba(229,9,20,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    triggerFlicker()
                    scrollToSection(item.href)
                  }}
                  className="text-[#DADADA] hover:text-[#E50914] transition-colors font-mono text-sm tracking-wider cursor-pointer relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent origin-center"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: "0 0 10px rgba(229,9,20,0.8)",
                    }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Controls with vein-glow buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleReducedMotion}
                className="p-2 text-[#888888] hover:text-[#E50914] transition-colors"
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 15px rgba(229,9,20,0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={reducedMotion ? "Enable animations" : "Reduce motion"}
              >
                {reducedMotion ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-[#DADADA]"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#050208]/98 backdrop-blur-xl md:hidden overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(ellipse at center, #1A0510 0%, #050208 70%)",
            }}
          >
            {/* Root tendrils background decoration */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
                <motion.path
                  d="M0,100 Q100,200 50,400 Q0,600 100,800"
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.path
                  d="M400,150 Q300,300 350,500 Q400,700 300,800"
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl text-[#DADADA] hover:text-[#E50914] transition-colors font-mono"
                  style={{
                    textShadow: "0 0 10px rgba(229,9,20,0.3)",
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
