import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Libre_Baskerville, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { EditorialUXProvider } from "@/components/editorial-ux"
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
      <head>
        <link rel="icon" href="/me.png" type="image/png" />
        <title>Sarweshwar Deivasihamani | Full Stack Developer | AI & ML | Karpagam Academy</title>
        <meta name="description" content="Portfolio of Sarweshwar Deivasihamani, Full Stack Developer, AI/ML enthusiast, student at Karpagam Academy, Erode. Also known as Sarwesh, Sarweshwar D, Sarweshwar Karpagam, Sarweshwar student at Karpagam, Sarweshwar Erode." />
        <meta name="keywords" content="Sarwesh, Sarweshwar, Sarweshwar Deivasihamani, Deivasihamani, Sarweshwar D, Sarweshwar Karpagam, Sarweshwar student at Karpagam, Sarweshwar Erode, Full Stack Developer, AI, ML, Karpagam Academy, Erode, Student Portfolio" />
        <meta name="author" content="Sarweshwar Deivasihamani" />
        <meta property="og:title" content="Sarweshwar Deivasihamani | Full Stack Developer | AI & ML" />
        <meta property="og:description" content="Portfolio of Sarweshwar Deivasihamani, Full Stack Developer, AI/ML enthusiast, student at Karpagam Academy, Erode." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarweshero.me" />
        <meta property="og:image" content="https://www.sarweshero.me/profile.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sarweshwar Deivasihamani | Full Stack Developer | AI & ML" />
        <meta name="twitter:description" content="Portfolio of Sarweshwar Deivasihamani, Full Stack Developer, AI/ML enthusiast, student at Karpagam Academy, Erode." />
        <meta name="twitter:image" content="https://www.sarweshero.me/profile.png" />
        <link rel="canonical" href="https://your-portfolio-url.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Sarweshwar Deivasihamani',
          alternateName: ['Sarweshero', 'sarweshero', 'Sarwesh', 'Sarweshwar D', 'Sarweshwar Karpagam', 'Sarweshwar student at Karpagam', 'Sarweshwar Erode'],
          jobTitle: 'Full Stack Developer',
          alumniOf: 'Karpagam Academy of Higher Education',
          address: {
            addressLocality: 'Erode',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'India',
          },
          url: 'https://your-portfolio-url.com',
        }) }} />
      </head>
      <body
        className={`${playfair.variable} ${baskerville.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <EditorialUXProvider>
          {children}
        </EditorialUXProvider>
        <Analytics />
      </body>
    </html>
  )
}
