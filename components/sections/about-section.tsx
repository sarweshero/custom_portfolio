"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const skills = [
  { name: "Python", category: "Backend" },
  { name: "JavaScript (ES6+)", category: "Frontend" },
  { name: "SQL", category: "Database" },
  { name: "C++", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Django REST Framework", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "OpenCV", category: "AI/ML" },
  { name: "MediaPipe", category: "AI/ML" },
  { name: "YOLOv8", category: "AI/ML" },
  { name: "TensorFlow.js", category: "AI/ML" },
  { name: "Git", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },
  { name: "Ubuntu Server", category: "DevOps" },
  { name: "SQLite", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
]

const skillsByCategory = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill.name)
    return acc
  },
  {} as Record<string, string[]>,
)

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="about" className="newspaper-container py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label">Editorial</span>
        <h2 className="headline-2 mt-4">About the Author</h2>
        <hr className="divider-single mt-4 max-w-xs mx-auto animate-divider-expand" />
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 column-rule">
        {/* Left: Portrait + Bio */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <article className="article-block">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              {/* Portrait */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-36 h-44 relative border border-[var(--rule)] overflow-hidden group">
                  <Image
                    src="/profile.png"
                    alt="Sarweshwar — Full Stack Developer & AI/ML Engineer"
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>
                <p className="meta-text mt-2 text-center">Sarweshwar</p>
              </motion.div>

              <div>
                <h3 className="headline-3 mb-2">Profile</h3>
                <p className="body-text drop-cap animate-drop-cap">
                  I&apos;m Sarweshwar, a motivated Computer Science undergraduate
                  with strong hands-on experience in backend development, computer
                  vision, and full-stack web technologies. Currently pursuing my
                  B.E. at Karpagam Academy of Higher Education, I combine academic
                  rigor with real-world engineering to build products that matter.
                </p>
              </div>
            </div>

            <motion.div
              className="space-y-4 body-text"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p>
                I have led impactful projects including developing the complete
                backend for a college-funded Alumni Portal, building an AI-based
                X-ray diagnostic tool, and creating an automated pest-detection
                drone. Beyond academics, I&apos;m actively engaged in
                hackathons — participating in over 10, reaching finals in 2, and
                winning selection in 1.
              </p>
              <p>
                As the IEEE Student Branch Chairperson and GeeksforGeeks Event
                Head, I constantly push boundaries while co-founding
                Xyndrix — a software solutions company delivering full-stack web
                applications and AI-driven systems.
              </p>
            </motion.div>
          </article>
        </motion.div>

        {/* Right: Skills Sidebar */}
        <motion.aside
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="article-block">
            <h3 className="headline-4 mb-4">Technical Proficiencies</h3>

            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 className="meta-text mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs border border-[var(--rule)] text-[var(--ink-light)] hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)] transition-all duration-300 cursor-default"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <hr className="divider-single mt-3" />
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
