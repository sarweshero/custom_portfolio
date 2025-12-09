"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section
      const sections = ["about", "projects", "experience", "education", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-shadow-black/95 backdrop-blur-lg border-b border-neon-red/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Nav Items */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`font-mono text-sm uppercase tracking-widest transition-colors ${
                activeSection === item.id ? "text-neon-red" : "text-muted-foreground hover:text-fog-white"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="underline" className="h-0.5 bg-neon-red mt-1" transition={{ duration: 0.3 }} />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgb(229, 9, 20)" }}
          className="hidden md:block px-4 py-2 border border-neon-red text-neon-red font-mono text-xs font-bold rounded hover:bg-neon-red hover:text-white transition-all"
        >
          Let's Talk
        </motion.a>
      </div>
    </motion.nav>
  )
}
