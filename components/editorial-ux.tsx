"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

interface EditorialUXState {
  scrollProgress: number
  activeSection: string
  sectionIndex: number
  totalSections: number
  greeting: string
}

const EditorialUXContext = createContext<EditorialUXState>({
  scrollProgress: 0,
  activeSection: "Home",
  sectionIndex: 0,
  totalSections: 6,
  greeting: "Good day, Reader.",
})

export function useEditorialUX() {
  return useContext(EditorialUXContext)
}

const sectionMap = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "projects", name: "Projects" },
  { id: "experience", name: "Experience" },
  { id: "education", name: "Education" },
  { id: "contact", name: "Contact" },
]

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 5) return "Burning the midnight oil, Reader."
  if (hour < 12) return "Good morning, Reader."
  if (hour < 17) return "Good afternoon, Reader."
  if (hour < 21) return "Good evening, Reader."
  return "Late-night browsing, Reader."
}

export function EditorialUXProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EditorialUXState>({
    scrollProgress: 0,
    activeSection: "Home",
    sectionIndex: 0,
    totalSections: sectionMap.length,
    greeting: "Good day, Reader.",
  })

  const updateScroll = useCallback(() => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const scrollProgress = documentHeight > 0 ? scrolled / documentHeight : 0

    document.documentElement.style.setProperty(
      "--scroll-progress",
      scrollProgress.toString()
    )

    // Detect active section
    let activeSection = "Home"
    let sectionIndex = 0

    for (let i = sectionMap.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionMap[i].id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= windowHeight * 0.4) {
          activeSection = sectionMap[i].name
          sectionIndex = i
          break
        }
      }
    }

    setState((prev) => ({
      ...prev,
      scrollProgress,
      activeSection,
      sectionIndex,
    }))
  }, [])

  useEffect(() => {
    setState((prev) => ({ ...prev, greeting: getGreeting() }))
    window.addEventListener("scroll", updateScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener("scroll", updateScroll)
  }, [updateScroll])

  return (
    <EditorialUXContext.Provider value={state}>
      {children}
    </EditorialUXContext.Provider>
  )
}
