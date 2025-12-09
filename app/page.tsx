"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence, motion } from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import LoadingScreen from "@/components/loading-screen"
import { ReducedMotionProvider } from "@/components/providers/reduced-motion-provider"
import VineOverlay from "@/components/effects/vine-overlay"
import FogOverlay from "@/components/effects/fog-overlay"
import VecnaCursor from "@/components/effects/vecna-cursor"

const PortalCanvas = dynamic(() => import("@/components/canvas/portal-canvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0A0A0A]" />,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <ReducedMotionProvider>
      <VecnaCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            ref={containerRef}
            className="relative min-h-screen"
          >
            {/* 3D Canvas Background */}
            <PortalCanvas scrollProgress={scrollProgress} />

            {/* Atmospheric Effects */}
            <FogOverlay intensity={scrollProgress} />
            <VineOverlay scrollProgress={scrollProgress} />

            {/* Navigation */}
            <Navigation />

            {/* Main Content Sections */}
            <div className="relative z-10">
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <ExperienceSection />
              <EducationSection />
              <ContactSection />
            </div>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center border-t border-[#2A0A10]">
              <p className="text-[#888888] font-mono text-sm">
                © 2025 Sarweshero. Built with passion from the Upside Down.
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </ReducedMotionProvider>
  )
}
