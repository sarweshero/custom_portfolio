"use client"

import { useState, useEffect } from "react"
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

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* ═══ MASTHEAD — Paper Unfold Reveal ═══ */}
      <header
        className={`newspaper-container pt-8 pb-2 text-center masthead-depth transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        id="hero"
      >
        {/* Top rule — animated expand */}
        <hr className={`divider-thick mb-4 ${loaded ? "animate-divider-expand delay-100" : "opacity-0"}`} />

        {/* Edition line */}
        <div
          className={`flex items-center justify-between mb-3 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="editorial-greeting">{greeting}</span>
          <span className="meta-text">{currentDate}</span>
          <span className="meta-text">Vol. I · No. 1</span>
        </div>

        <hr className={`divider-single mb-6 ${loaded ? "animate-divider-expand delay-300" : "opacity-0"}`} />

        {/* Masthead title — dramatic letter-spacing reveal */}
        <h1
          className={`headline-1 mb-2 ${loaded ? "animate-masthead-reveal" : "opacity-0"}`}
          style={{ fontFamily: "var(--font-serif)", animationDelay: "0.4s" }}
        >
          The Sarweshero Chronicle
        </h1>

        <p
          className={`text-[var(--ink-muted)] text-sm tracking-[0.25em] uppercase mb-1 transition-all duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "var(--font-serif)",
            fontVariant: "small-caps",
            transitionDelay: "800ms",
          }}
        >
          Full Stack Development · Artificial Intelligence · Machine Learning
        </p>

        <hr className={`divider-double mt-6 mb-1 ${loaded ? "animate-divider-expand delay-900" : "opacity-0"}`} />
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
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1100ms" }}
      >
        <HeroSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <AboutSection />
        </div>

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <ProjectsSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <ExperienceSection />
        </div>

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <EducationSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12 animate-divider-expand" />
        </div>

        <div className="section-block">
          <ContactSection />
        </div>
      </main>

      {/* ═══ FLOATING MICRO DETAILS ═══ */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
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

      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <span className="page-number">
          {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-2 border-[var(--ink)] mt-16">
        <div className="newspaper-container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[var(--ink-muted)]">
            <div>
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
            <div className="text-right">
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
