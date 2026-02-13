import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Libre_Baskerville, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Sarweshero Chronicle — Full Stack Developer & AI/ML Engineer",
  description:
    "A newspaper-style digital portfolio showcasing Full Stack Development, AI/ML Engineering, and innovative projects by Sarweshwar.",
  keywords: [
    "Full Stack Developer",
    "AI/ML Engineer",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Sarweshwar" }],
  openGraph: {
    title: "The Sarweshero Chronicle — Full Stack Developer & AI/ML Engineer",
    description:
      "A newspaper-style digital portfolio showcasing projects and experience.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${baskerville.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
