"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ReducedMotionContextType {
  reducedMotion: boolean
  toggleReducedMotion: () => void
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
})

export function useReducedMotion() {
  return useContext(ReducedMotionContext)
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check OS preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const toggleReducedMotion = () => setReducedMotion((prev) => !prev)

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}
