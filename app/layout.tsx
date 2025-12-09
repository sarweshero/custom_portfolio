import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display, Special_Elite } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] })
const _specialElite = Special_Elite({ subsets: ["latin"], variable: "--font-typewriter", weight: "400" })

export const metadata: Metadata = {
  title: "Sarweshero | Full Stack Developer & AI/ML Engineer",
  description:
    "Enter the Upside Down - A cinematic portfolio experience showcasing Full Stack Development and AI/ML Engineering projects",
  keywords: ["Full Stack Developer", "AI/ML Engineer", "React", "Next.js", "Python", "Machine Learning"],
  authors: [{ name: "Sarweshwar" }],
  openGraph: {
    title: "Sarweshero | Full Stack Developer & AI/ML Engineer",
    description: "Enter the Upside Down - A cinematic portfolio experience",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${_geist.variable} ${_geistMono.variable} ${_playfair.variable} ${_specialElite.variable} font-sans antialiased bg-[#0A0A0A] text-[#DADADA] overflow-x-hidden`}
      >
        <div className="scanline-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
