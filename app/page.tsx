"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronUp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import HeroSection from "../components/sections/hero-section"
import AboutSection from "../components/sections/about-section"
import ProjectsSection from "../components/sections/projects-section"
import ExperienceSection from "../components/sections/experience-section"
import EducationSection from "../components/sections/education-section"
import ContactSection from "../components/sections/contact-section"
import Navigation from "../components/navigation"
import { useEditorialUX } from "../components/editorial-ux"

export default function Home() {
  const { activeSection, sectionIndex, totalSections, greeting } = useEditorialUX()
  const [loaded, setLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const shortDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ═══ MASTHEAD — Paper Unfold Reveal ═══ */}
      <header
        className={`newspaper-container pt-6 md:pt-8 pb-2 text-center masthead-depth transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        id="hero"
      >
        {/* Top rule — animated expand */}
        <hr className={`divider-thick mb-3 md:mb-4 ${loaded ? "animate-divider-expand delay-100" : "opacity-0"}`} />

        {/* Edition line — responsive layout */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0 mb-3 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="editorial-greeting hidden sm:inline">{greeting}</span>
          <span className="meta-text">{typeof window !== "undefined" && window.innerWidth < 640 ? shortDate : currentDate}</span>
          <span className="meta-text hidden sm:inline">Vol. I · No. 1</span>
        </div>

        <hr className={`divider-single mb-4 md:mb-6 ${loaded ? "animate-divider-expand delay-300" : "opacity-0"}`} />

        {/* Masthead title — dramatic letter-spacing reveal */}
        <h1
          className={`headline-1 mb-2 ${loaded ? "animate-masthead-reveal" : "opacity-0"}`}
          style={{ fontFamily: "var(--font-serif)", animationDelay: "0.4s" }}
        >
          The Sarweshero Chronicle
        </h1>

        <p
          className={`text-[var(--ink-muted)] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-1 transition-all duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "var(--font-serif)",
            fontVariant: "small-caps",
            transitionDelay: "800ms",
          }}
        >
          Full Stack Development · AI · ML
        </p>

        <hr className={`divider-double mt-4 md:mt-6 mb-1 ${loaded ? "animate-divider-expand delay-900" : "opacity-0"}`} />
        <hr className={`divider-single mt-1 ${loaded ? "animate-divider-expand delay-1000" : "opacity-0"}`} />
      </header>

      {/* ═══ NAVIGATION ═══ */}
      <div
        className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "1000ms" }}
      >
        <Navigation />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        id="main-content"
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1100ms" }}
      >
        <HeroSection />

        <div className="newspaper-container">
          <hr className="divider-double my-8 md:my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <AboutSection />
        </div>

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <ProjectsSection />

        <div className="newspaper-container">
          <hr className="divider-double my-8 md:my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <ExperienceSection />
        </div>

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <EducationSection />

        <div className="newspaper-container">
          <hr className="divider-double my-8 md:my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <ContactSection />
        </div>
      </main>

      {/* ═══ FLOATING MICRO DETAILS (desktop only) ═══ */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block" aria-hidden="true">
        <div className="now-reading">Now Reading</div>
        <div
          className="text-xs mt-0.5"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--ink-muted)",
            fontStyle: "italic",
            fontSize: "0.65rem",
          }}
        >
          {activeSection}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40 hidden lg:block" aria-hidden="true">
        <span className="page-number">
          {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      {/* ═══ SCROLL TO TOP BUTTON ═══ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="scroll-to-top lg:hidden"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-2 border-[var(--ink)] mt-12 md:mt-16" role="contentinfo">
        <div className="newspaper-container py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm text-[var(--ink-muted)]">
            <div className="text-center md:text-left">
              <h4 className="headline-4 text-[var(--ink)] mb-2">The Chronicle</h4>
              <p style={{ fontFamily: "var(--font-body)" }}>
                A digital newspaper portfolio by Sarweshwar, showcasing work
                in full stack development, AI, and machine learning.
              </p>
            </div>
            <div className="text-center">
              <p className="meta-text mb-2">Published from</p>
              <p style={{ fontFamily: "var(--font-body)" }}>
                Karpagam Academy of Higher Education
              </p>
              <p style={{ fontFamily: "var(--font-body)" }}>
                Coimbatore, Tamil Nadu, India
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="meta-text mb-2">Connect</p>
              <div className="space-y-1" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  <a href="mailto:sarweshero@gmail.com" className="hover:text-[var(--ink)] underline transition-colors">
                    sarweshero@gmail.com
                  </a>
                </p>
                <p>
                  <a href="https://github.com/sarweshero" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] underline transition-colors">
                    GitHub
                  </a>
                  {" · "}
                  <a href="https://www.linkedin.com/in/sarweshero" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] underline transition-colors">
                    LinkedIn
                  </a>
                  {" · "}
                  <a href="https://x.com/sarweshero" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] underline transition-colors">
                    X/Twitter
                  </a>
                </p>
              </div>
            </div>
          </div>

          <hr className="divider-single my-6" />

          <p className="text-center text-xs text-[var(--ink-faded)]" style={{ fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} Sarweshwar. All rights reserved. Designed as a digital newspaper experience.
          </p>
        </div>
      </footer>
    </div>
  )
}
