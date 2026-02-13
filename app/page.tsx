"use client"

import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"

export default function Home() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen">
      {/* ═══ MASTHEAD ═══ */}
      <header className="newspaper-container pt-8 pb-2 text-center" id="hero">
        {/* Top rule */}
        <hr className="divider-thick mb-4" />

        {/* Edition line */}
        <div className="flex items-center justify-between mb-3">
          <span className="meta-text">{currentDate}</span>
          <span className="meta-text">Digital Edition</span>
          <span className="meta-text">Vol. I · No. 1</span>
        </div>

        <hr className="divider-single mb-6" />

        {/* Masthead title */}
        <h1
          className="headline-1 mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The Sarweshero Chronicle
        </h1>

        <p
          className="text-[var(--ink-muted)] text-sm tracking-[0.25em] uppercase mb-1"
          style={{ fontFamily: "var(--font-serif)", fontVariant: "small-caps" }}
        >
          Full Stack Development · Artificial Intelligence · Machine Learning
        </p>

        <hr className="divider-double mt-6 mb-1" />
        <hr className="divider-single mt-1" />
      </header>

      {/* ═══ NAVIGATION ═══ */}
      <Navigation />

      {/* ═══ MAIN CONTENT ═══ */}
      <main>
        <HeroSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12" />
        </div>

        <AboutSection />

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <ProjectsSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12" />
        </div>

        <ExperienceSection />

        <div className="newspaper-container">
          <hr className="divider-ornamental" />
        </div>

        <EducationSection />

        <div className="newspaper-container">
          <hr className="divider-double my-12" />
        </div>

        <ContactSection />
      </main>

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
