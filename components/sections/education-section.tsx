"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const education = [
  {
    school: "Karpagam Academy of Higher Education",
    degree: "B.E. Computer Science and Engineering",
    dateRange: "Aug 2023 – May 2027 (Expected)",
    location: "Coimbatore, India",
    achievements: [
      "Actively pursuing undergraduate studies with focus on software development, algorithms, and data structures",
      "Engaged in projects and research in Full Stack Development and AI/ML",
      "Chairperson, IEEE Student Branch — KAHE (Apr 2025 – Present)",
      "Event Head, GeeksforGeeks Student Chapter — KAHE (2025 – Present)",
      "Member, Metaverse Students Association (2024 – Present)",
      "Active participation in technical events and extracurricular initiatives",
      "Building a strong foundation across core CS subjects",
    ],
    leadership: [
      { title: "Chairperson, IEEE Student Branch", period: "Apr 2025 – Present" },
      { title: "Event Head, GeeksforGeeks Student Chapter", period: "2025 – Present" },
      { title: "Member, Metaverse Students Association", period: "2024 – Present" },
    ],
  },
  {
    school: "Self-Directed Learning & Professional Development",
    degree: "Full Stack Development & AI/ML Specialization",
    dateRange: "Continuous Learning",
    location: "Remote",
    achievements: [
      "Mastered full stack development with emphasis on backend technologies",
      "Gained expertise in TensorFlow, PyTorch, and Hugging Face",
      "Developed proficiency across AWS, Azure, and Google Cloud",
      "Built production-ready applications with modern web stacks",
      "Contributed to real-world deployments including a live alumni portal",
    ],
    leadership: [],
  },
  {
    school: "Technical Certifications & Courses",
    degree: "Cloud Computing & Machine Learning",
    dateRange: "Professional Development",
    location: "Remote",
    achievements: [
      "Completed extensive machine learning and deep learning coursework",
      "Hands-on experience with Docker containerization and deployment",
      "Specialized in database design and management across multiple platforms",
      "Developed expertise in API development using Django REST Framework",
      "Mastered deployment and server management using Nginx and cloud services",
    ],
    leadership: [],
  },
]

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section ref={ref} id="education" className="newspaper-container py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Academia</span>
        <h2 className="headline-2 mt-4">Education & Learning</h2>
        <hr className="divider-single mt-4 max-w-xs mx-auto" />
      </motion.div>

      {/* Education Cards — Accordion */}
      <div className="max-w-3xl mx-auto space-y-0">
        {education.map((edu, i) => (
          <motion.article
            key={edu.school}
            className="border-t border-[var(--rule)] last:border-b"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Header — Always visible */}
            <button
              className="w-full py-5 flex items-start gap-4 text-left hover:bg-[var(--paper-aged)]/50 transition-colors px-2"
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              aria-expanded={expandedIndex === i}
            >
              <div className="flex-1 min-w-0">
                <h3 className="headline-4">{edu.school}</h3>
                <p
                  className="text-sm text-[var(--ink-muted)] mt-0.5"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                >
                  {edu.degree}
                </p>
                <p className="meta-text mt-1">
                  {edu.dateRange} · {edu.location}
                </p>
              </div>
              <span
                className={`mt-1 text-[var(--ink-muted)] transition-transform duration-200 ${
                  expandedIndex === i ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-2 pb-6">
                    <hr className="divider-single mb-4" />

                    {/* Achievements */}
                    <h4 className="meta-text mb-3">Achievements & Activities</h4>
                    <ul className="space-y-2 mb-4">
                      {edu.achievements.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <span className="mt-2 w-1 h-1 bg-[var(--ink)] rounded-full flex-shrink-0" />
                          <span className="text-[var(--ink-light)]">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Leadership Roles */}
                    {edu.leadership.length > 0 && (
                      <>
                        <h4 className="meta-text mb-3">Leadership Roles</h4>
                        <div className="space-y-2">
                          {edu.leadership.map((role, j) => (
                            <div
                              key={j}
                              className="flex items-center justify-between py-2 px-3 border border-[var(--rule)]"
                            >
                              <span className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-body)" }}>
                                {role.title}
                              </span>
                              <span className="meta-text text-[0.625rem]">{role.period}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
