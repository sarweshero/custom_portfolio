"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEditorialUX } from "./editorial-ux"

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
  const { activeSection } = useEditorialUX()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
    return () => document.body.classList.remove("menu-open")
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen])

  // Trap focus inside mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length > 0) focusable[0].focus()
  }, [isOpen])

  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? "bg-[var(--paper)]/95 backdrop-blur-sm shadow-[0_1px_0_var(--rule)]"
          : "bg-[var(--paper)]"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top thin rule */}
      <div className="h-px bg-[var(--rule)]" aria-hidden="true" />

      <div className="newspaper-container">
        {/* Desktop Navigation Row */}
        <div className="hidden md:flex items-center justify-center gap-10 py-3">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.name
            return (
              <span key={item.name} className="flex items-center gap-10">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`nav-link-style transition-all duration-300 ${
                    isActive ? "nav-link-active" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </a>
                {i < navItems.length - 1 && (
                  <span className="text-[var(--rule)] text-xs select-none" aria-hidden="true">·</span>
                )}
              </span>
            )
          })}
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex md:hidden items-center justify-between py-3">
          <span
            className="text-sm font-bold tracking-widest uppercase text-[var(--ink)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {isScrolled ? activeSection : "Chronicle"}
          </span>
          <button
            ref={toggleRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center text-[var(--ink)]"
            style={{ minWidth: "48px", minHeight: "48px" }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[min(80vw,320px)] bg-[var(--paper)] z-50 md:hidden flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.08)]"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--rule)]">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--ink-muted)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Navigate
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center text-[var(--ink)]"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto py-4 px-6">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.name
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className={`flex items-center gap-3 py-4 border-b border-[var(--rule-light)] text-base tracking-[0.12em] uppercase transition-colors duration-200 ${
                        isActive
                          ? "text-[var(--accent-burgundy)] font-semibold"
                          : "text-[var(--ink-light)]"
                      }`}
                      style={{
                        fontFamily: "var(--font-serif)",
                        minHeight: "48px",
                        textDecoration: "none",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <span className="w-2 h-2 bg-[var(--accent-burgundy)] rounded-full flex-shrink-0" aria-hidden="true" />
                      )}
                      {item.name}
                    </motion.a>
                  )
                })}
              </div>

              {/* Menu footer */}
              <div className="px-6 py-4 border-t border-[var(--rule)]">
                <p
                  className="text-[0.625rem] tracking-[0.2em] uppercase text-[var(--ink-faded)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Press Esc to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom thin rule */}
      <div className="h-px bg-[var(--rule)]" aria-hidden="true" />
    </nav>
  )
}
