"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

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
      <div className="h-px bg-[var(--rule)]" />

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
                    isActive
                      ? "!color-[var(--accent-burgundy)] !text-[var(--accent-burgundy)]"
                      : ""
                  }`}
                  style={isActive ? { color: "var(--accent-burgundy)" } : undefined}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.name}
                </a>
                {i < navItems.length - 1 && (
                  <span className="text-[var(--rule)] text-xs select-none">·</span>
                )}
              </span>
            )
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between py-3">
          <span
            className="text-sm font-bold tracking-widest uppercase text-[var(--ink)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {isScrolled ? activeSection : "Chronicle"}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[var(--ink)]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--rule)] bg-[var(--paper)]">
          <div className="newspaper-container py-4 flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.name
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="nav-link-style py-1"
                  style={isActive ? { color: "var(--accent-burgundy)" } : undefined}
                >
                  {isActive ? "▸ " : ""}{item.name}
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom thin rule */}
      <div className="h-px bg-[var(--rule)]" />
    </nav>
  )
}
